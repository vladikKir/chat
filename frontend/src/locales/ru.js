export default {
  translation: {
    loginPage: {
      enter: 'Войти',
      username: 'Ваш ник',
      password: 'Ваш пароль',
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
        min3: 'Не менее 3 символов',
        min6: 'Не менее 6 символов',
        max20: 'Не более 20 символов',
        required: 'Обязательное поле',
        mustMatch: 'Пароли должны совпадать',
      },
    },
    chatPage: {
      main: {
        channels: 'Каналы',
      },
      channels: {
        dropdown: {
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
        errors: {
          min1: 'Не менее 1 символа',
          max15: 'Не более 15 символов',
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
          min1: 'Не менее 1 символа',
          max15: 'Не более 15 символов',
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
      networkError: 'Ошибка сети',
      channelAdd: 'Канал добавлен',
      channelRemove: 'Канал удален',
      channelRename: 'Канал переименован',
    },
  },
};
