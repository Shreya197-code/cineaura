export const checkValidData = (name, email, password) => {

    const isEmailValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isPasswordValid =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      .test(password);

    const isNameValid =
      /^[a-zA-Z\s]+$/.test(name);

    if (!isEmailValid) return "Email is not valid";

    if (!isPasswordValid)
      return "Password must contain letter, number & special character";

    if (name !== undefined && !isNameValid)
      return "Name is not valid";

    return null;
};