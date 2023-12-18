
export const signUpMutation = {
  type: AuthPayload,
  args: {
    input: {
      type: new GraphQLNonNull(CreateUserInput),
      description: "User to be created",
    },
  },
  resolve: async (
    _source: unknown,
    { input: { name, email, password } }: any,
    _context: IApolloServerContext
  ): Promise<authPayloadType> => {
    const enc_password = await bcrypt.hash(password, 10);
    const otpGenerated = await generateOTP(5);
    const user = await createNewUser(name, email, enc_password, otpGenerated);
    await sendOtpEmail(email, otpGenerated);

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "SECRET_KEY",
      { algorithm: "HS256", subject: String(user.id), expiresIn: "1d" }
    );
    return {
      token,
      user,
    };
  },
};

export const createNewUser = async (
  name: string,
  email: string,
  password: string,
  otpGenerated: string
): Promise<User> => {
  const otpExpiration = new Date();
  otpExpiration.setMinutes(otpExpiration.getMinutes() + 5);

  return prisma.user.create({
    data: {
      name,
      email,
      password,
      status: "Active",
      bgAccount: { create: { teamSize: "2+" } },
      OTP: {
        create: {
          otp: otpGenerated,
          expirationTime: otpExpiration,
        },
      },
    },
    include: {
      OTP: true,
    },
  });
};

export const getAllSaveFormDetailsByFormUuidQuery = {
  type: DefaultPayload,
  args: {
    input: {
      type: new GraphQLNonNull(getAllformInput),
      description: "Get all from data by fromUuid",
    },
  },
  resolve: async (
    _source: unknown,
    { input: { formUuid, limit = 0, offset = 0 } }: any,
    _context: IApolloServerContext
  ): Promise<defaultPayloadType> => {
    return getAllSaveFormDetailsByFormUuid(formUuid, limit, offset);
  },
};

export const createNewFormBuilder = async (payload: {
  bgAccountId: number;
  name: string;
  templateID: number;
  description: string;
  formData: object;
  cardStyle: string;
  cardBackground: string;
}): Promise<any> => {
  const uniqueFormIdString = generateRandomIdWithLength(32);
  const newData = await prisma.formBuilder.create({
    data: {
      formData: payload.formData,
      bgAccountId: payload.bgAccountId,
      name: payload.name,
      userTypeId: 0,
      templateID: payload.templateID,
      description: payload.description,
      formUuid: uniqueFormIdString,
      cardStyle: payload.cardStyle,
      cardBackground: payload.cardBackground
    },
  });
  return newData;
};
