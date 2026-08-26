export default function ConfirmacaoWhatsApp({
  whatsappUrl,
}: {
  whatsappUrl: string;
}) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="rounded-full bg-gold/10 p-4 text-4xl">✅</div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-foreground">
          Cadastro preenchido!
        </h2>
        <p className="text-base text-muted">
          Agora toque no botão abaixo — o WhatsApp vai abrir com a mensagem já
          pronta. Só apertar <strong className="text-foreground">ENVIAR</strong>{" "}
          (o balão de mensagem) para o Felipe receber o cadastro do seu
          atleta.
        </p>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-whatsapp px-6 py-5 text-lg font-bold text-black shadow-lg transition-colors hover:bg-whatsapp-dark"
      >
        📲 Enviar cadastro no WhatsApp
      </a>

      <p className="text-sm text-muted">
        O cadastro só chega ao Felipe quando você apertar{" "}
        <strong className="text-foreground">enviar</strong> dentro do
        WhatsApp.
      </p>
    </div>
  );
}
