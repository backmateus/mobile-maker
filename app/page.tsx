import Logo from "@/components/Logo";
import CadastroForm from "@/components/CadastroForm";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-4 py-10">
      <header className="flex flex-col items-center gap-3 text-center">
        <Logo size={128} />
        <div>
          <h1 className="sr-only">Mobile Maker</h1>
          <p className="text-sm text-muted">
            📸 Siga a gente no Instagram e acompanhe os vídeos:{" "}
            <a
              href="https://instagram.com/felipao83_"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold hover:text-gold-light transition-colors"
            >
              @felipao83_
            </a>
          </p>
          <p className="text-sm text-muted">
            Cadastro do atleta para captação e edição do vídeo
          </p>
        </div>
      </header>

      <div className="rounded-2xl border border-border bg-surface/60 p-6">
        <CadastroForm />
      </div>
    </main>
  );
}
