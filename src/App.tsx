import "./App.css";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useEffect } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

function App() {
  const [formValues, setFormValues] = useState<FormData>({
    firstName: "",
    lastName: "",
    password: "",
    age: 0,
    confirmPassword: "",
    email: "",
  });
  const [users, setUsers] = useState<FormData[]>([]);

  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18).max(70),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    console.log(users);
  }, [users]);
  const submitData = (data: FormData, e) => {
    setUsers([...users, data]);
    setFormValues({
      firstName: "",
      lastName: "",
      password: "",
      age: 0,
      confirmPassword: "",
      email: "",
    });
    console.log(users);
    e.preventDefault();
    e.target.reset();
  };

  return (
    <div className="App">
      <div className="header">
        <h2> Form Validation in React using Zod</h2>
      </div>

      <form className="form" onSubmit={handleSubmit(submitData)}>
        <label>First Name: </label>
        <input
          type="text"
          {...register("firstName", { value: formValues.firstName })}
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}

        <label>Last Name: </label>
        <input
          type="text"
          {...register("lastName", { value: formValues.lastName })}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}

        <label>Email: </label>
        <input
          type="email"
          {...register("email", { value: formValues.email })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <label>Age: </label>
        <input
          type="number"
          {...register("age", { valueAsNumber: true, value: formValues.age })}
        />
        {errors.age && <span>{errors.age.message}</span>}

        <label>Password: </label>
        <input
          type="password"
          {...register("password", { value: formValues.password })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <label>Confirm Password: </label>
        <input
          type="password"
          {...register("confirmPassword", {
            value: formValues.confirmPassword,
          })}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
        <input type="submit" />
      </form>
      <div className="bottomheader">
        <h3>
          Error messages will show for incorrect Type and After submit the user
          data is shown to the console for visual validation of the user array
        </h3>
      </div>
    </div>
  );
}

export default App;
