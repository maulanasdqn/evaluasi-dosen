"use client";
import { Button } from "@/components/ui/button";
import { ControlledFieldText } from "@/components/ui/controlled-field-text";
import { Form } from "@/components/ui/form";
import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email tidak boleh kosong" })
    .email({ message: "Email tidak valid" }),
  password: z.string().min(1, { message: "Kata sandi tidak boleh kosong" }),
});

export const FormLogin: FC = (): ReactElement => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<z.infer<typeof schema>>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const login = await signIn("login", data, { redirect: false });
    login?.ok && router.push("/dashboard");
  });

  return (
    <Form
      onSubmit={onSubmit}
      className="w-full mt-[25px] gap-y-4 flex flex-col"
    >
      <ControlledFieldText
        control={control}
        name="email"
        size="sm"
        type="email"
        placeholder="Email"
        message={errors?.email?.message}
        status={errors?.email?.message ? "error" : "none"}
      />
      <ControlledFieldText
        control={control}
        name="password"
        size="sm"
        type="password"
        placeholder="Kata Sandi"
        message={errors?.password?.message}
        status={errors?.password?.message ? "error" : "none"}
      />
      <Button disabled={!isValid} isFullWidth variant={"primary"} size={"sm"}>
        Masuk
      </Button>
    </Form>
  );
};
