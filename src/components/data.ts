export const HERO_IMG = "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/caf940d1-8aef-49fc-8d6d-0d394d1c26f4.jpg";
export const PEOPLE_IMG = "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/567735db-d77b-4a71-bb75-949b07452454.jpg";
export const RESORT_IMG = "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/66625b0b-7835-4bcd-942b-1f9f016ccb4b.jpg";

export const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "routes", label: "Туры" },
  { id: "about", label: "О компании" },
  { id: "quiz", label: "Подбор тура" },
  { id: "reviews", label: "Отзывы" },
  { id: "booking", label: "Бронирование" },
  { id: "contacts", label: "Контакты" },
];

export const ROUTES = [
  { id: 1, title: "Китай — Хайнань", type: "пляжный", duration: 7, price: 65897, difficulty: "лёгкий", img: "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/bucket/9867595d-0b65-419f-9c55-08ea10189184.jpg", description: "Отдых на берегу Южно-Китайского моря по цене обычного отпуска", tag: "Хит сезона" },
  { id: 2, title: "Турция — Анталья All Inclusive", type: "пляжный", duration: 10, price: 52000, difficulty: "лёгкий", img: RESORT_IMG, description: "Отдых для всей семьи в лучших отелях Антальи с системой «всё включено»", tag: "" },
  { id: 3, title: "Таиланд — Пхукет & Самуи", type: "экзотика", duration: 14, price: 115000, difficulty: "средний", img: HERO_IMG, description: "Экзотика Юго-Восточной Азии: тропические острова, храмы и уличная кухня", tag: "Новинка" },
  { id: 4, title: "Мальдивы — Медовый месяц", type: "романтика", duration: 7, price: 195000, difficulty: "лёгкий", img: RESORT_IMG, description: "Бунгало над водой, кораллы, приватный пляж — идеально для двоих", tag: "Эксклюзив" },
  { id: 5, title: "Европа — Grand Tour", type: "экскурсионный", duration: 12, price: 78000, difficulty: "средний", img: PEOPLE_IMG, description: "10 стран, 20 городов: Париж, Рим, Барселона, Вена — настоящий европейский маршрут", tag: "" },
  { id: 6, title: "Кипр — семейный отдых", type: "пляжный", duration: 8, price: 64000, difficulty: "лёгкий", img: RESORT_IMG, description: "Тёплое Средиземноморье, безопасные пляжи и насыщенная инфраструктура для детей", tag: "" },
];

export const REVIEWS = [
  { name: "Инна Старыгина", rating: 5, text: "Компания ответственная, остались очень довольны, рекомендую к сотрудничеству. Анастасия просто умничка, что порекомендовала нам отель на пляже Най Янг Пхукет, несказанно благодарны за помощь в организации поездки, очень внимательна ко всем пожеланиям клиента. Однозначно обращайтесь, не пожалеете.", date: "Апрель 2026", avatar: "И" },
  { name: "Ольга Ярощук", rating: 5, text: "Путешествую с Авиа Некст тур не в первый раз. Анастасия очень ответственно подходит к выбору тура. Она уже знает наши предпочтения и рекомендует направления по нашим пожеланиям. Были на Бали до пандемии, во Вьетнаме, на Пхукете, Паттайе. Вот вернулись в феврале 2026 г. с о. Боракай. Мы очень довольны. Нравится что можно оформить тур без посещения офиса, всё прозрачно. Доверяю компании. Анастасия, спасибо за работу. Рекомендую, работают без обмана.", date: "Март 2026", avatar: "О" },
  { name: "Александр Кузмичев", rating: 5, text: "Решился съездить в Таиланд впервые. Обратился в Авиа Нэкст Тур, менеджер Анна подобрала отличный вариант отдыха. Всё прошло гладко, впечатления незабываемые. Сервис на высоте, рекомендую компанию друзьям и знакомым.", date: "Декабрь 2025", avatar: "А" },
  { name: "Марина Рихлюк", rating: 5, text: "Хочу выразить огромную благодарность директору Анастасии туркомпании «Авиа Нэкст Тур» за организацию незабываемого отдыха в ОАЭ в ноябре 2025 г. Просто всё было супер, Анастасия — профессионал своего дела. Буду всем рекомендовать. Процветания и удачи вашей туркомпании.", date: "Ноябрь 2025", avatar: "М" },
];

export const GALLERY_ITEMS = [
  { img: HERO_IMG, label: "Полёт над облаками" },
  { img: PEOPLE_IMG, label: "Счастливые путешественники" },
  { img: RESORT_IMG, label: "Тропический рай" },
  { img: HERO_IMG, label: "Бизнес-перелёты" },
  { img: RESORT_IMG, label: "Отдых у моря" },
  { img: PEOPLE_IMG, label: "Групповые туры" },
];

export type FilterState = {
  type: string;
  duration: string;
  price: string;
  difficulty: string;
};

export type BookingForm = {
  name: string;
  phone: string;
  route: string;
  date: string;
  people: string;
};

export type ContactForm = {
  name: string;
  email: string;
  message: string;
};