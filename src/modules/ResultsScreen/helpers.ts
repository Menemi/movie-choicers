import { ShowNotificationProps } from '../../types';

export const validatePartnerResultsCode = (decryptedValue: string): ShowNotificationProps | undefined => {
    if (!decryptedValue) {
        return {
            title: 'Ошибка при вставке кода результатов партнера',
            message: 'Код пустой :(',
            type: 'error',
        };
    }

    if (
        !decryptedValue.includes('>') ||
        decryptedValue.replace(/[^>]+/g, '').length !== decryptedValue.split(',').length
    ) {
        return {
            title: 'Ошибка при вставке кода результатов партнера',
            message:
                'Вставлен неправильный код, скорее всего, это код подборки, а нужен код с результатами партнера ' +
                '(посмотри в нижнюю часть экрана, у твоего партнера должен быть такой же элемент на экране)',
            type: 'error',
        };
    }

    return;
};
