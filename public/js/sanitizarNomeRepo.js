function sanitizarNomeRepo(str) {
    str = str.replace('https://github.com/', '').replace('.zip', '')
    str = str.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ' ').trim();
    return str;
}

export { sanitizarNomeRepo }