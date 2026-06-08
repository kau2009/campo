const modalNoticia = document.getElementById('modal-noticia');
const imagemModalNoticia = document.getElementById('imagem-modal-noticia');
const tituloModalNoticia = document.getElementById('titulo-modal-noticia');
const botaoFecharNoticia = document.getElementById('fechar-modal-noticia');
const botaoLerNoticia = document.getElementById('botao-ler-noticia');
const botaoLinkNoticia = document.getElementById('botao-link-noticia');
const gatilhosNoticia = document.querySelectorAll('.gatilho-noticia');

// EDITE AQUI: coloque o texto completo que deve ser lido para cada noticia.
const TEXTOS_NOTICIAS = {};

let textoNoticiaAtivo = '';
let urlNoticiaAtiva = '';

function pararLeituraNoticia() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  botaoLerNoticia.textContent = 'Ler notícia';
}

function abrirModalNoticia(gatilho) {
  const titulo = gatilho.dataset.tituloNoticia || 'Notícia';
  const imagem = gatilho.dataset.imagemNoticia || '';
  const idNoticia = gatilho.dataset.idNoticia || '';
  const urlNoticia = gatilho.dataset.urlNoticia || '';

  tituloModalNoticia.textContent = titulo;
  imagemModalNoticia.src = imagem;
  imagemModalNoticia.alt = titulo;
  textoNoticiaAtivo = TEXTOS_NOTICIAS[idNoticia] || '';
  urlNoticiaAtiva = urlNoticia;

  modalNoticia.classList.add('ativo');
  document.body.classList.add('modal-aberto');
}

function fecharModalNoticia() {
  pararLeituraNoticia();
  modalNoticia.classList.remove('ativo');
  document.body.classList.remove('modal-aberto');
  imagemModalNoticia.src = '';
  imagemModalNoticia.alt = '';
  tituloModalNoticia.textContent = '';
  urlNoticiaAtiva = '';
}

function lerNoticia() {
  if (!('speechSynthesis' in window)) {
    alert('Leitura por voz não suportada neste navegador.');
    return;
  }

  if (!textoNoticiaAtivo.trim()) {
    alert('Adicione o texto da notícia no arquivo script-noticias.js (objeto TEXTOS_NOTICIAS).');
    return;
  }

  pararLeituraNoticia();
  const leitura = new SpeechSynthesisUtterance(textoNoticiaAtivo);
  leitura.lang = 'pt-BR';
  leitura.rate = 1;
  leitura.pitch = 1;

  leitura.onstart = () => {
    botaoLerNoticia.textContent = 'Lendo...';
  };

  leitura.onend = () => {
    botaoLerNoticia.textContent = 'Ler notícia';
  };

  window.speechSynthesis.speak(leitura);
}

function abrirNoticiaCompleta() {
  if (!urlNoticiaAtiva.trim()) {
    alert('Adicione a URL da notícia no data-url-noticia do botão no index.html.');
    return;
  }

  window.open(urlNoticiaAtiva, '_blank', 'noopener');
}

gatilhosNoticia.forEach((gatilho) => {
  gatilho.addEventListener('click', () => abrirModalNoticia(gatilho));
});

botaoLerNoticia.addEventListener('click', lerNoticia);
botaoLinkNoticia.addEventListener('click', abrirNoticiaCompleta);
botaoFecharNoticia.addEventListener('click', fecharModalNoticia);

modalNoticia.addEventListener('click', (event) => {
  if (event.target === modalNoticia) fecharModalNoticia();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalNoticia.classList.contains('ativo')) {
    fecharModalNoticia();
  }
});
