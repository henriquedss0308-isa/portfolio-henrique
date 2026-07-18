# Henrique Santos | Portfólio de Desenvolvimento Web

Site portfólio profissional para apresentar projetos demonstrativos e facilitar o contato com possíveis clientes.

**Stack:** HTML, CSS e JavaScript puro — sem frameworks. Pronto para publicar no Vercel.

---

## Estrutura do projeto

```
portfolio-henrique/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── favicon.svg
│   └── projetos/
│       ├── landing-psicologa.png
│       ├── orca-facil.png
│       ├── agenda-simples.png
│       └── visao-comercial.png
└── README.md
```

---

## Como abrir localmente

1. Clone ou baixe este repositório.
2. Abra a pasta do projeto no seu editor.
3. Abra o arquivo `index.html` no navegador:
   - Duplo clique no arquivo, ou
   - Use a extensão **Live Server** (VS Code / Cursor), ou
   - No terminal, na pasta do projeto:

```bash
# Python 3
python -m http.server 5500
```

Depois acesse: `http://localhost:5500`

Não é necessário instalar dependências nem rodar build.

---

## Como publicar no Vercel

### Opção A — Pelo site da Vercel

1. Envie o projeto para o GitHub (veja a seção abaixo).
2. Acesse [vercel.com](https://vercel.com) e faça login.
3. Clique em **Add New Project** e importe o repositório.
4. Mantenha as configurações padrão (não precisa de framework, build command ou output directory).
5. Clique em **Deploy**.

### Opção B — Pela CLI

```bash
npm i -g vercel
vercel
```

Siga as perguntas interativas. O site estático será publicado automaticamente.

---

## Onde alterar os contatos

Abra **`js/main.js`** e edite o objeto no topo do arquivo:

```js
const contactLinks = {
  whatsapp: "COLOCAR_LINK_WHATSAPP",
  instagram: "COLOCAR_LINK_INSTAGRAM",
  email: "mailto:COLOCAR_EMAIL",
  github: "https://github.com/henriquedss0308-isa",
};
```

### Exemplos de valores corretos

| Canal     | Formato                                      |
|-----------|----------------------------------------------|
| WhatsApp  | `https://wa.me/5511999999999`                |
| Instagram | `https://instagram.com/seu_usuario`          |
| E-mail    | `mailto:seu@email.com`                       |
| GitHub    | `https://github.com/seu-usuario`             |

**Importante:** enquanto o valor contiver `COLOCAR_`, o botão correspondente fica desativado automaticamente. Não invente dados — preencha só o que for real.

---

## Onde alterar os links e textos dos projetos

Os quatro cards ficam em **`index.html`**, na seção `#projetos`.

Para cada projeto, edite o `<article class="project-card">` correspondente:

- Nome: `.project-card__title`
- Categoria: `.project-card__category`
- Descrição: `.project-card__description`
- Imagem: atributo `src` da tag `<img>`
- Demonstração e código: atributos `href` dos botões

### Projetos atuais

| Projeto                     | Demo                                              | GitHub |
|-----------------------------|---------------------------------------------------|--------|
| Landing Page para Psicóloga | https://landing-page-psicologa-chi.vercel.app/    | [repo](https://github.com/henriquedss0308-isa/landing-page-psicologa) |
| Orça Fácil                  | https://orca-facil-ochre.vercel.app/              | [repo](https://github.com/henriquedss0308-isa/orca-facil) |
| Agenda Simples              | https://agenda-simples-five.vercel.app/           | [repo](https://github.com/henriquedss0308-isa/agenda-simples) |
| Visão Comercial             | https://visao-comercial-five.vercel.app/          | [repo](https://github.com/henriquedss0308-isa/visao-comercial) |

---

## Onde colocar os screenshots

Coloque as imagens em:

```
assets/projetos/
```

Com estes nomes exatos:

| Arquivo                 | Projeto                     |
|-------------------------|-----------------------------|
| `landing-psicologa.png` | Landing Page para Psicóloga |
| `orca-facil.png`        | Orça Fácil                  |
| `agenda-simples.png`    | Agenda Simples              |
| `visao-comercial.png`   | Visão Comercial             |

### Dicas para as imagens

- Proporção atual dos screenshots: **~20:9** (ex.: 1366×610) — o CSS usa a mesma razão
- Formato: PNG ou JPG (se usar JPG, atualize o `src` no HTML)
- O CSS usa `object-fit: cover` + `object-position: top center` — sem distorção
- Se o arquivo ainda não existir, o site mostra um **fallback elegante** com o nome do projeto

---

## Como adicionar um novo projeto

1. Adicione a imagem em `assets/projetos/` (ex.: `novo-projeto.png`).
2. Em `index.html`, dentro de `.projects-grid`, copie um `<article class="project-card">` completo.
3. Atualize:
   - `src` e `alt` da imagem
   - categoria, nome e descrição
   - links de demonstração e GitHub
4. Salve e recarregue a página.

Não é necessário alterar o JavaScript para novos cards.

---

## Como alterar textos e cores

### Textos

| Conteúdo              | Arquivo        | Onde |
|-----------------------|----------------|------|
| Título principal (H1) | `index.html`   | seção `.hero` |
| Navegação             | `index.html`   | header |
| Serviços              | `index.html`   | `#servicos` |
| Como funciona         | `index.html`   | `#como-funciona` |
| Contato               | `index.html`   | `#contato` |
| Meta title / description | `index.html` | `<head>` |

### Cores

Abra **`css/styles.css`** e edite as variáveis em `:root`:

```css
:root {
  --bg: #0b0f14;           /* fundo principal */
  --bg-card: #141b24;      /* fundo dos cards */
  --text: #e8edf4;         /* texto principal */
  --text-muted: #9aa8b8;   /* texto secundário */
  --accent: #6b8cff;       /* azul de destaque */
  --purple: #8b7cf6;       /* roxo auxiliar */
  /* ... */
}
```

---

## Subir no GitHub e publicar no Vercel

### 1. Criar repositório e enviar

```bash
cd portfolio-henrique
git init
git add .
git commit -m "Primeira versão do portfólio"
git branch -M main
git remote add origin https://github.com/henriquedss0308-isa/SEU-REPO.git
git push -u origin main
```

Substitua `SEU-REPO` pelo nome do repositório criado no GitHub.

### 2. Publicar na Vercel

1. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
2. Framework Preset: **Other** (ou deixe em branco).
3. Build Command e Output Directory: deixe vazios.
4. Deploy.

A cada `git push` na branch principal, a Vercel republica o site automaticamente.

---

## Checklist rápido

- [ ] Preencher WhatsApp, Instagram e e-mail em `js/main.js`
- [ ] Colocar os 4 screenshots em `assets/projetos/`
- [ ] Revisar textos e links no `index.html`
- [ ] Testar no celular (menu, botões, sem rolagem horizontal)
- [ ] Publicar no GitHub + Vercel

---

## Observação importante

Os projetos exibidos neste portfólio são **demonstrativos**, criados para apresentar habilidades em desenvolvimento web. Eles **não** representam trabalhos realizados para clientes reais. O site deixa isso claro na introdução da seção de projetos.
