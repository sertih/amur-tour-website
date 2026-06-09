export const HERO_IMG = "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/caf940d1-8aef-49fc-8d6d-0d394d1c26f4.jpg";
export const PEOPLE_IMG = "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/567735db-d77b-4a71-bb75-949b07452454.jpg";
export const RESORT_IMG = "https://cdn.poehali.dev/projects/e3c4122f-0f20-43fa-9a94-a1e79f8d750a/files/66625b0b-7835-4bcd-942b-1f9f016ccb4b.jpg";

export const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "routes", label: "Туры" },
  { id: "about", label: "О компании" },
  { id: "reviews", label: "Отзывы" },
  { id: "booking", label: "Бронирование" },
  { id: "contacts", label: "Контакты" },
];

export const ROUTES = [
  { id: 1, title: "ОАЭ — Дубай Deluxe", type: "пляжный", duration: 7, price: 89000, difficulty: "лёгкий", img: RESORT_IMG, description: "Роскошный отдых в сердце Эмиратов: небоскрёбы, золотые пляжи, шоппинг и спа", tag: "Хит сезона" },
  { id: 2, title: "Турция — Анталья All Inclusive", type: "пляжный", duration: 10, price: 52000, difficulty: "лёгкий", img: RESORT_IMG, description: "Отдых для всей семьи в лучших отелях Антальи с системой «всё включено»", tag: "" },
  { id: 3, title: "Таиланд — Пхукет & Самуи", type: "экзотика", duration: 14, price: 115000, difficulty: "средний", img: HERO_IMG, description: "Экзотика Юго-Восточной Азии: тропические острова, храмы и уличная кухня", tag: "Новинка" },
  { id: 4, title: "Мальдивы — Медовый месяц", type: "романтика", duration: 7, price: 195000, difficulty: "лёгкий", img: RESORT_IMG, description: "Бунгало над водой, кораллы, приватный пляж — идеально для двоих", tag: "Эксклюзив" },
  { id: 5, title: "Европа — Grand Tour", type: "экскурсионный", duration: 12, price: 78000, difficulty: "средний", img: PEOPLE_IMG, description: "10 стран, 20 городов: Париж, Рим, Барселона, Вена — настоящий европейский маршрут", tag: "" },
  { id: 6, title: "Кипр — семейный отдых", type: "пляжный", duration: 8, price: 64000, difficulty: "лёгкий", img: RESORT_IMG, description: "Тёплое Средиземноморье, безопасные пляжи и насыщенная инфраструктура для детей", tag: "" },
];

export const REVIEWS = [
  { name: "Алексей Петров", rating: 5, text: "Летали в Дубай через Авиа Некст Тур — всё на высшем уровне! Визы оформили быстро, трансфер встретил вовремя. Отель превзошёл ожидания.", date: "Март 2025", avatar: "А" },
  { name: "Марина Соколова", rating: 5, text: "Ездили с семьёй в Турцию — дети в полном восторге! Менеджеры помогли подобрать идеальный отель с хорошим детским клубом.", date: "Апрель 2025", avatar: "М" },
  { name: "Дмитрий Новиков", rating: 5, text: "Тур по Европе организован безупречно. Каждая деталь продумана, гид профессиональный. Уже планируем следующее путешествие с вами!", date: "Май 2025", avatar: "Д" },
  { name: "Ольга Кузнецова", rating: 5, text: "Мальдивы на медовый месяц — это была сказка. Спасибо Авиа Некст Тур за идеальную организацию нашего особенного путешествия!", date: "Май 2025", avatar: "О" },
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