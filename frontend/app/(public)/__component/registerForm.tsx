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

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

        {/* Formulário de registro (apenas visual) */}
        <Card className="w-full shadow-lg border-border">
          <form>
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Criar conta
              </CardTitle>
              <CardDescription>
                Preencha os dados abaixo para se cadastrar no Meu Gerente.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Nome completo */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  autoComplete="name"
                />
              </div>

              {/* E-mail */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  autoComplete="email"
                />
              </div>

              {/* Usuário (slug) */}
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="seu_usuario"
                  autoComplete="username"
                />
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="pr-10"
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
              </div>

              {/* Confirmar senha */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar senha</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="pr-10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground cursor-pointer"
                    aria-label={
                      showConfirmPassword
                        ? "Ocultar senha"
                        : "Mostrar senha"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-2 cursor-pointer"
              >
                Registrar
              </Button>

              {/* Separador */}
              <div className="flex items-center gap-2 py-2">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  ou
                </span>
                <Separator className="flex-1" />
              </div>

              {/* Registro com login social (mesmo padrão visual) */}
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  Registrar com o Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-center gap-2 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  Registrar com o Github
                </Button>
              </div>
            </CardContent>

            <CardFooter className="justify-center text-xs text-muted-foreground">
              Já tem conta?
              <a
                className="text-primary hover:underline ml-1 cursor-pointer"
                href="/login"
              >
                Entrar
              </a>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
