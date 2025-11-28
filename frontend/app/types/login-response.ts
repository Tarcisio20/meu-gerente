export type LoginResponse = {
  success: boolean;
  token?: string; // 'token' é opcional pois pode não existir em um erro
  message: string;
  data?: any; // Dados adicionais que podem ser retornados
}