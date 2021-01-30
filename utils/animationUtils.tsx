import { min } from "react-native-reanimated";

// Проверка заходит ли pills между двумя на линии
export const isBetweenPills = (
    value: number,
    firstPosition: number,
    secondPosition: number
) => {
    "worklet";
    return value >= firstPosition && value <= secondPosition;
}

//Изменение order когда pills уходит с линии
export const removePills = (positions: Position[], index: number) => {
    "worklet";
    const newPositions = positions
        .filter((_, id: number) => id !== index)
        .filter((pos: Position) => pos.order.value !== -1)
        .sort((a: Position, b: Position) => a.order.value > b.order.value ? 1 : -1);
    newPositions.map((item: Position, id: number) => item.order.value = id)
}

//Сортировка pills которые находятся на линии
export const checkOrder = (position: Position) => {
    "worklet";
    return position.order.value !== -1;
}

// Расчет новой позиции (на линии, ушел с линии)
export const calculatingInLinePos = (position: Position[], containerWidth: number) => {
    "worklet";

    let lineCount: number = 1;
    let newLine: number = 0;


    let newPosition: Position[] = position
        .filter(checkOrder)
        .sort((a: Position, b: Position) => a.order.value > b.order.value ? 1 : -1);

    if (newPosition.length === 0) {
      return;
    }

    newPosition.forEach((position: Position, index: number) => {
      const currentWidth: number = newPosition
        .slice(newLine, index)
        .reduce((acc: number, item: Position) => acc + item.width.value, 0);
      if (currentWidth + position.width.value > containerWidth) {
        lineCount += 1;
        newLine = index;
        position.x.value = 0;
      } else {
        position.x.value = currentWidth;
      }
      if(lineCount < 2) {
        position.y.value = -120 * lineCount;
      } else {
        position.y.value = -60
      }
    });
};

const move = (input: any, current: number, future: number) => {
    "worklet";
    const offsets = input.slice();
    while (current < 0) {
      current += offsets.length;
    }
    while (future < 0) {
      future += offsets.length;
    }
    if (future >= offsets.length) {
      let k = future - offsets.length;
      while (k-- + 1) {
        offsets.push();
      }
    }
    offsets.splice(future, 0, offsets.splice(current, 1)[0]);
    return offsets;
  };

//Перестроить положение pills если между двумя из них заходит новый
const reBuildPosition = (
    positions: Position[],
    current: number, 
    future: number
) => {
    "worklet";
    const position = positions
        .filter(checkOrder)
        .sort((a: Position, b: Position) => a.order.value > b.order.value ? 1 : -1);

    const newPosition = move(position, current, future);
    newPosition.map((position: Position, index: number) => (position.order.value = index));
}

//Сортировка pills
export const sortPills = (
    positions: Position[],
    transition: Transition,
    index: number,
    containerWidth: number,
    currentPosition: Position
) => {
    "worklet";
    positions.some((item: Position) => {
        const xSide = isBetweenPills(transition.x.value, item.x.value, item.x.value + item.width.value);
        const ySide = isBetweenPills(transition.y.value, item.y.value, item.y.value + 55);
        if(xSide && ySide) {
            reBuildPosition(positions, currentPosition.order.value, item.order.value)
            calculatingInLinePos(positions, containerWidth)
            return false;
        }
        
    })
}

export const calculatingWithoutLinePos = (
    positions: Position[],
    containerWidth: number,
    index: number
) => {
    "worklet";

    let inLine: Position[] = positions.filter(item => item.order.value === -1)
        .sort((a: Position, b:Position) => a.order.value > b.order.value ? 1 : -1);
    let line = 2;
    let minusLine = 0;
    positions.forEach((position: Position, id: number) => {
        const currentWidth: number = positions
            .slice(minusLine, id)
            .reduce((acc: number, item: Position) => acc + item.width.value, 0);
        if(position.order.value === -1) {
            if(id > index) {
                if((currentWidth + position.width.value) > containerWidth) {
                    position.y.value = 0;
                    position.x.value = containerWidth - 80 - 16;
                    minusLine = id;
                    if(currentWidth === 400) {
                        position.x.value -= 80;
                    }
                } else {
                    if(inLine.length < 8){
                        position.x.value -= 80;
                    } else {
                        position.x.value = position.originalX.value - 80;
                        position.y.value = position.originalY.value;
                    }
                }
                console.log(currentWidth, position.x.value)
            } else {
                position.x.value = position.originalX.value
                position.y.value = position.originalY.value
            }
        }
    })
    console.log('-------')
}
