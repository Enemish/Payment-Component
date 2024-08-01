export default {
  beforeMount(el, binding, vnode) {
    function format(value) {
      if (!value) return '';
      let stringValue = value.toString();
      stringValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      if (!stringValue.includes('₽')) {
        stringValue += '₽';
      }
      return stringValue;
    }

    function unformat(value) {
      if (!value) return '';
      return value.replace(/[.₽]/g, '');
    }

    el.oninput = function(e) {
      if (!e.isTrusted) return; // prevent infinite loop
    
      const cursorPosition = el.selectionStart;
      const inputLength = el.value.length;
    
      // Убираем форматирование
      const unformattedValue = unformat(el.value);
    
      // Запоминаем длину неформатированной строки до изменения
      const oldUnformattedLength = unformattedValue.length;
    
      // Форматируем значение
      const formattedValue = format(unformattedValue);
    
      // Обновляем значение в поле ввода
      el.value = formattedValue;
    
      // Рассчитываем новую позицию курсора
      let newCursorPosition = cursorPosition;
    
      // Проверяем разницу в длине строки до и после форматирования
      if (formattedValue.length !== oldUnformattedLength) {
        if (cursorPosition > inputLength - 1) {
          newCursorPosition = formattedValue.length - 1;
        } else {
          let lengthDifference = formattedValue.length - inputLength;
          newCursorPosition = cursorPosition + lengthDifference;
        }
      }
    
      el.setSelectionRange(newCursorPosition, newCursorPosition);
    };

    el.value = format(binding.value);
  },
  updated(el, binding, vnode) {
    function format(value) {
      if (!value) return '';
      let stringValue = value.toString();
      stringValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      if (!stringValue.includes('₽')) {
        stringValue += '₽';
      }
      return stringValue;
    }

    el.value = format(binding.value);

    if (vnode.context && vnode.context.cursorPosition !== undefined) {
      el.setSelectionRange(vnode.context.cursorPosition, vnode.context.cursorPosition);
    }
  }
};
