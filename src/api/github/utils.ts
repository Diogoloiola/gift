type FunctionSignature = {
  language(language: string | number): string;
  forks(amount: number | string): string;
  size(amount: string | number): string;
  license(license: string | number): string;
  stars(stars: string | number): string;
  topics(topic: string | number): string;
};

type ParamsQuery = {
  language: string;
  forks: number;
  size: number;
  license: string;
  stars: number;
  topics: string;
};


function bindQuery(key: string, value: string | number): string {
  const options: FunctionSignature = {
    language(language: string): string {
      if (language === '') return '';
      return `language:${language} `;
    },
    forks(amount: number): string {
      if (amount === 0) return '';
      return `forks:>=${amount} `;
    },
    size(amount: number): string {
      if (amount === 0) return '';
      return `size:>=${amount} `;
    },
    license(license: string): string {
      if (license === '') return '';
      return `license:${license} `;
    },
    stars(stars: number): string {
      if (stars === 0) return '';
      return `stars:>=${stars} `;
    },
    topics(topic: string): string {
      if (topic === '') return '';
      return `topic:${topic} `;
    },
  };

  return options[key as keyof FunctionSignature](value);
}

function createQueryForRequest(params: ParamsQuery): string {
  let query = '';
  Object.keys(params).forEach((key: string) => {
    query += bindQuery(key, params[key as keyof ParamsQuery]);
  })
  return query;
}

export default createQueryForRequest;