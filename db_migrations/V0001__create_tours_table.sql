CREATE TABLE IF NOT EXISTS t_p21277743_amur_tour_website.tours (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    duration INTEGER NOT NULL,
    price INTEGER NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    img TEXT NOT NULL,
    description TEXT NOT NULL,
    tag VARCHAR(100) DEFAULT '',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p21277743_amur_tour_website.tours (title, type, duration, price, difficulty, img, description, tag) VALUES
('Китай', 'пляжный', 7, 65897, 'лёгкий', 'https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/bucket/9867595d-0b65-419f-9c55-08ea10189184.jpg', 'Отдых на берегу Южно-Китайского моря по цене обычного отпуска', 'Хит сезона'),
('Индонезия — Бали', 'пляжный', 10, 95000, 'лёгкий', 'https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/66625b0b-7835-4bcd-942b-1f9f016ccb4b.jpg', 'Подарите себе путешествие мечты на Бали — остров, где каждый день наполнен новыми эмоциями, потрясающими видами и ощущением абсолютной гармонии с природой и собой', ''),
('Вьетнам — Камрань', 'пляжный', 14, 273182, 'средний', 'https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/bucket/2bcc5874-6a20-44a4-9b7a-906ff86e3b8d.jpg', 'Насладитесь отдыхом в Камрани — курорте, который покоряет своими широкими пляжами, тёплым морем круглый год и уютной атмосферой, позволяющей полностью расслабиться и забыть о повседневных заботах', 'Новинка'),
('Таиланд — Пхукет', 'пляжный', 7, 158211, 'лёгкий', 'https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/66625b0b-7835-4bcd-942b-1f9f016ccb4b.jpg', 'Пхукет — жемчужина Таиланда, где белоснежные пляжи, кристально чистое море и тропическая природа создают идеальные условия для незабываемого отдыха в любое время года', 'Эксклюзив'),
('Сейшельские острова', 'пляжный', 12, 115661, 'средний', 'https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/bucket/e8bcdc7f-fa9f-4568-a495-0248667abcb9.jpg', 'Сейшелы — это место, где время замедляется, а каждый день наполнен красотой природы, спокойствием океана и яркими впечатлениями от отдыха мирового уровня', ''),
('Япония', 'экскурсионный', 8, 174000, 'лёгкий', 'https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/bucket/568b7ffd-fa7c-4a8b-b777-14dac3bf2bf7.jpg', 'От величественных храмов и цветущей сакуры до футуристических мегаполисов — путешествие по Японии подарит уникальный опыт, наполненный красотой, вдохновением и яркими открытиями', '');
