import { getRandomInteger, createUniqueRandomIntegerGenerator, createUniqueRandomArrayElementGenerator, getRandomArrayElement } from './util.js';

const PHOTO__DESCRIPTION = [
  'Фото с новой камеры',
  'Просто так.',
  'С фильтром',
  'Без фильтра',
  'Интересно получилось?',
  'Муд на сегодня',
  'Жду комментов!',
  'Хочу больше лайков',
  'Не пишите гадости, пожалуйста',
  'Где вы, хейтеры?',
  'Хейтеры – мощный мотиватор',
  'Настойчивость окупается сполна',
  'Работаю на себя, сам и только для себя',
  'Что вы об этом думаете?',
  'Разве не потрясающе?',
  'Если бы вы были животным, то каким?',
  'Соскучились?',
  'Вы из города или деревни?',
  'Угадайте, где я',
  'Не сижу на месте',
  'Открываю для себя мир. Скоро вернусь',
  'Говорю “да” новым приключениям',
  'Лучше один раз увидеть',
  'Коротко и ясно',
  'Я всё компенсирую',
  'Я всё игнорирую',
]

const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Аркадий',
  'Инокентий',
  'Анжела',
  'Тамара',
  'Евгений',
  'Софья',
  'Яна',
  'Кирилл',
  'Ева',
  'Галина',
  'Антон',
  'Ян',
  'Илья',
  'Лариса',
  'Юрий',
  'Наталья',
  'Олег',
  'Тимофей',
  'Никита',
  'Александра',
  'Маргарита',
];

const COUNT__PHOTO = 25;

const Likes = {
  MIN: 15,
  MAX: 200,
};

const CommentsCount = {
  MIN: 2,
  MAX: 6,
};

const AvatarCount = {
  MIN: 1,
  MAX: 6,
}

const photos = [];

const addComment = () => {
  const comments = [];
  const avatarIntegerGenerator = createUniqueRandomIntegerGenerator(AvatarCount.MIN, AvatarCount.MAX);
  const messageGenerator = createUniqueRandomArrayElementGenerator(COMMENTS_MESSAGE);
  for (let i = 0; i < getRandomInteger(CommentsCount.MIN, CommentsCount.MAX); i++) {
    const comment = {
      id: (i + 1),
      avatar: 'img/avatar-' + avatarIntegerGenerator() + '.svg',
      message: messageGenerator(),
      name: getRandomArrayElement(NAMES),
    }
    comments.push(comment);
  }
  return comments;
};

const addPhotos = () => {
  const photoIntegerGenerator = createUniqueRandomIntegerGenerator(1, COUNT__PHOTO);
  const commentsDescriptionGenerator = createUniqueRandomArrayElementGenerator(PHOTO__DESCRIPTION);
  for (let i = 0; i < COUNT__PHOTO; i++) {
    const photo = {
      id: (i + 1),
      url: 'photos/' + photoIntegerGenerator() + '.jpg',
      description: commentsDescriptionGenerator(),
      likes: getRandomInteger(Likes.MIN, Likes.MAX),
      comments: addComment(),
    }
    photos.push(photo);
  }
};

addPhotos();
export { photos };
