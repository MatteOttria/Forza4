let isRed = true
let topCount = 0;
//comando bootstrap
const message = new bootstrap.Modal(document.getElementById('message'))
const messageBody = document.getElementById('message-body')
const buttonsRow = document.getElementById('buttons-row')
const rows = document.getElementsByClassName('map-row')
const map = []

for (let i = 0; i < rows.length; i++)
    map.push(rows[i].children)

function insert(colIndex)
{
    for (let rowIndex = map.length - 1; rowIndex >= 0; rowIndex--)
    {
        if (!map[rowIndex][colIndex].className.includes('disc-'))
        {
            const playerClass = isRed ? 'disc-red' : 'disc-yellow'
            map[rowIndex][colIndex].classList.add(playerClass)
            
            if (checkWin(rowIndex, colIndex, playerClass))
            {
                messageBody.innerHTML = isRed ? 'ROSSO ha vinto!' : 'GIALLO ha vinto!'
                message.show()
            }

            if (rowIndex == 0 && ++topCount == map[rowIndex].length)
            {
                messageBody.innerHTML = 'PAREGGIO!'
                message.show()
            }

            isRed = !isRed
            break
        }
    }
}

function checkWin(rowIndex, colIndex, playerClass)
{
    return (
        checkRowWin(rowIndex, colIndex, playerClass) ||
        checkColWin(rowIndex, colIndex, playerClass) ||
        checkDiagonalTopToBottomWin(rowIndex, colIndex, playerClass) ||
        checkDiagonalBottomToTopWin(rowIndex, colIndex, playerClass)
    )
}

function checkRowWin(rowIndex, colIndex, playerClass)
{
    let count = 1;

    //check right
    for (let i = colIndex + 1; i < map[rowIndex].length; i++)
    {
        if (!map[rowIndex][i].classList.contains(playerClass))
            break

        count++
    }

    //check left
    for (let i = colIndex - 1; i >= 0; i--)
    {
        if (!map[rowIndex][i].classList.contains(playerClass))
            break

        count++
    }

    return count == 4
}

function checkColWin(rowIndex, colIndex, playerClass)
{
    let count = 1;

    //check bottom
    for (let i = rowIndex + 1; i < map.length; i++)
    {
        if (!map[i][colIndex].classList.contains(playerClass))
            break

        count++
    }

    //check top
    for (let i = rowIndex - 1; i >= 0; i--)
    {
        if (!map[i][colIndex].classList.contains(playerClass))
            break

        count++
    }

    return count == 4;
}

function checkDiagonalTopToBottomWin(rowIndex, colIndex, playerClass)
{
    let count = 1;

    //bottom right
    for (let r = rowIndex + 1, c = colIndex + 1; r < map.length && c < map[rowIndex].length; r++, c++)
    {
        if (!map[r][c].classList.contains(playerClass))
            break

        count++
    }

    //top left
    for (let r = rowIndex - 1, c = colIndex - 1; r >= 0 && c >= 0; r--, c--)
    {
        if (!map[r][c].classList.contains(playerClass))
            break

        count++
    }

    return count == 4
}

function checkDiagonalBottomToTopWin(rowIndex, colIndex, playerClass)
{
    let count = 1;

    //bottom left
    for (let r = rowIndex + 1, c = colIndex - 1; r < map.length && c >= 0; r++, c--)
    {
        if (!map[r][c].classList.contains(playerClass))
            break

        count++
    }

    //top right
    for (let r = rowIndex - 1, c = colIndex + 1; r >= 0 && c < map[rowIndex].length; r--, c++)
    {
        if (!map[r][c].classList.contains(playerClass))
            break

        count++
    }

    return count == 4
}
