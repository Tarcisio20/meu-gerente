"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github, Mail, Eye, EyeOff } from "lucide-react";
import { ModeToggle } from "@/app/components/toggle-mode";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { login } from "@/app/service/auth";

// schema de login: aceita e-mail OU usuário (slug)
const loginSchema = z.object({
  login: z
    .string()
    .min(1, "Informe seu e-mail ou usuário")
    .refine(
      (value) =>
        /\S+@\S+\.\S+/.test(value) || /^[a-zA-Z0-9._-]+$/.test(value),
      {
        message:
          "Use um e-mail válido ou um usuário (letras, números, . _ -).",
      }
    ),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login({ email: data.login, password: data.password })
      if (!response.success) {
        toast.error(response.message || "Erro ao fazer login. ER-04")
        return
      }

      toast.success(response.message || "Seja bem vindo!")

      return

    } catch (error) {
      toast.error("Erro ao fazer login. ER-01")
      return
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background relative px-4">
      {/* Toggle de tema no canto superior direito */}
      <div className="absolute top-4 right-4 cursor-pointer">
        <ModeToggle />
      </div>

      {/* Conteúdo principal: logo em cima + form embaixo */}
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        {/* Logo */}
        <div className="w-full flex justify-center">
          <Image
            src="/images/logo-meu-gerente.png"
            alt="Meu Gerente"
            width={260}
            height={260}
            className="w-40 h-auto sm:w-52 md:w-60 object-contain"
            priority
          />
        </div>

        {/* Formulário */}
        <Card className="w-full shadow-lg border-border">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Entrar
              </CardTitle>
              <CardDescription>
                Acesse sua conta para gerenciar suas finanças.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Login (e-mail ou usuário) */}
              <div className="space-y-2">
                <Label htmlFor="login">E-mail ou usuário</Label>
                <Input
                  id="login"
                  type="text"
                  placeholder="seuemail@exemplo.com ou seu_usuario"
                  autoComplete="username"
                  {...register("login")}
                />
                {errors.login && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.login.message}
                  </p>
                )}
              </div>

              {/* Senha + mostrar/ocultar */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="pr-10"
                    {...register("password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground cursor-pointer"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full mt-2 cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>

              <div className="text-xs text-muted-foreground text-right mt-1 cursor-pointer hover:underline">
                <a href="/forgot-password">Esqueci minha senha</a>
              </div>

              {/* Separador */}
              <div className="flex items-center gap-2 py-2">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  ou
                </span>
                <Separator className="flex-1" />
              </div>

              {/* Login social */}
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  Logar com o Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-center gap-2 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  Logar com o Github
                </Button>
              </div>
            </CardContent>

            <CardFooter className="justify-center text-xs text-muted-foreground">
              Não tem conta?
              <a
                className="text-primary hover:underline ml-1 cursor-pointer"
                href="/register"
              >
                Criar conta
              </a>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
