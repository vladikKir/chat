export default {
  translation: {
    loginPage: {
      enter: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      noAcc: 'Нет аккаунта? ',
      registration: 'Регистрация',
      errors: {
        wrongLoginOrPass: 'Неверные имя пользователя или пароль',
      },
    },
    signupPage: {
      registration: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      signup: 'Зарегистрироваться',
      errors: {
        min3max20: 'От 3 до 20 символов',
        min6: 'Не менее 6 символов',
        required: 'Обязательное поле',
        mustMatch: 'Пароли должны совпадать',
        alreadyExist: 'Пользователь уже существует',
      },
    },
    chatPage: {
      main: {
        channels: 'Каналы',
      },
      channels: {
        dropdown: {
          channelControl: 'Управление каналом',
          delete: 'Удалить',
          rename: 'Переименовать',
        },
      },
      messages: {
        messagesCount: 'Сообщений: ',
        sendMessagesForm: {
          placeholder: 'Введите сообщение...',
          send: 'Отправить',
        },
      },
    },
    modal: {
      add: {
        addChannel: 'Добавить канал',
        send: 'Отправить',
        channelName: 'Имя канала',
        errors: {
          min3max20: 'От 3 до 20 символов',
          required: 'Обязательное поле',
        },
      },
      remove: {
        deleteChannel: 'Удалить канал',
        sure: 'Уверены?',
        delete: 'Удалить',
        cancel: 'Отмена',
      },
      rename: {
        renameChannel: 'Переименовать канал',
        cancel: 'Отмена',
        save: 'Сохранить',
        errors: {
          min3max20: 'От 3 до 20 символов',
          required: 'Обязательное поле',
        },
      },
    },
    navBar: {
      logOut: 'Выйти',
    },
    errorPage: {
      header: 'Тут ничего :(',
    },
    notifies: {
      networkError: 'Ошибка соединения',
      channelAdd: 'Канал создан',
      channelRemove: 'Канал удалён',
      channelRename: 'Канал переименован',
    },
  },
};
