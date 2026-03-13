import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUp as signUpApi } from "../../services/apiAuth";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: (fullName, email, password) =>
      signUpApi(fullName, email, password),

    onSuccess: (user) => {
      console.log(user);

      toast.success("Conform your Email to  Sign-In");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signUp, isLoading };
}
