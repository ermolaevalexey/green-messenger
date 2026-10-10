import {ConnectionForm} from '../ConnectionForm/ConnectionForm.tsx';
import {useData} from './Router.data.ts';
import {ChatsWorkSpace} from '../ChatsWorkSpace/ChatsWorkSpace.tsx';
import {ApiProvider} from '../../api/provider.tsx';
import {ChatCircleDots, ShieldCheck, Sparkle} from '@phosphor-icons/react';
import {Text} from '@mantine/core';
import classes from './Router.module.css';

export const Router = () => {
  const {account, credentials, onConnect} = useData();

  if (account) {
    return (
      <ApiProvider credentials={credentials}>
        <ChatsWorkSpace account={account} />
      </ApiProvider>
    );
  }

  return (
    <main className={classes.landing}>
      <div className={classes.glowOne} />
      <div className={classes.glowTwo} />

      <div className={classes.layout}>
        <section className={classes.intro}>
          <div className={classes.brand}>
            <div className={classes.brandIcon}>
              <ChatCircleDots size={28} weight="fill" />
            </div>
            <Text className={classes.brandName}>Connect</Text>
          </div>

          <div className={classes.introContent}>
            <Text className={classes.eyebrow}>
              <Sparkle size={15} weight="fill" />
              ПРОСТОЕ ОБЩЕНИЕ
            </Text>

            <h1 className={classes.heading}>
              Ваши диалоги. {' '}
              <span>В одном месте.</span>
            </h1>

            <p className={classes.subtitle}>
              Подключите аккаунт Green-API, чтобы начать переписку и управлять сообщениями в удобном
              интерфейсе.
            </p>

            <div className={classes.preview}>
              <div className={classes.previewHeader}>
                <div className={classes.previewAvatar}>А</div>
                <div>
                  <Text className={classes.previewName}>Ваши диалоги</Text>
                  <Text className={classes.previewStatus}>Всё готово к общению</Text>
                </div>
                <span className={classes.onlineDot} />
              </div>

              <div className={classes.receivedMessage}>Привет! Теперь мы на связи 👋</div>

              <div className={classes.sentMessage}>
                Отлично, начинаем!
                <span>✓✓</span>
              </div>
            </div>
          </div>

          <div className={classes.privacyNote}>
            <ShieldCheck size={18} />
            <Text>Подключение через ваши данные Green-API</Text>
          </div>
        </section>

        <section className={classes.formSection}>
          <div className={classes.formCard}>
            <div className={classes.cardIcon}>
              <ChatCircleDots size={25} weight="duotone" />
            </div>

            <h2 className={classes.formTitle}>Добро пожаловать</h2>

            <p className={classes.formDescription}>
              Подключите свой экземпляр, чтобы перейти к чатам.
            </p>

            <ConnectionForm onSubmit={onConnect} />

            <Text className={classes.hint} size="xs">
              Используйте ID и токен своего экземпляра Green-API.
            </Text>
          </div>
        </section>
      </div>
    </main>
  );
};
