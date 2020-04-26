let condicionaisQuery = {
    language(str) {
        if (str === '') return '';
        return `language:${str} `
    },
    forks(str) {
        if (str === '') return '';
        return `forks:>=${str} `
    },
    size(str) {
        if (str === '') return '';
        return `size:>=${str} `;
    },
    license(str) {
        if (str === '') return '';
        return `license:${str} `
    },
    stars(str) {
        if (str === '') return '';
        return `stars:>=${str} `;
    },
    topic(str) {
        if (str === '') return '';
        return `topic:${str} `;
    },
    created(str) {
        if (str === '') return '';
            let ano = new Date().getFullYear() - parseInt(str);
        return `created:>=${ano}-01-01`;
    },
    perPage(str) {
        let quantidade = str ? str : 100;
        return `&page=1&per_page=${quantidade};`
    }
}

export { condicionaisQuery };