/**
 * Default Up Modules
 * @author Yaro Schiffelers - github.com/yaroschiffelers
 * @license MIT
 */

const quickEmail = require('./email')
const newBoard = require('./trello')

module.exports = {
    actions: [
        /**
         * Send a quick email.
         * Takes 3 arguments and sends an email
         * arguments: TO, SUBJECT, BODY
         */
        {
            name: 'Quick Email',
            question: [
                {
                    name: 'TO',
                    type: 'input',
                    message: 'to?'
                },
                {
                    name: 'SUBJECT',
                    type: 'input',
                    message: 'subject?'
                },
                {
                    name: 'BODY',
                    type: 'input',
                    message: 'message?'
                }
            ],
            method: async (to, subject, body) => {
                return await quickEmail(to, subject, body)
            }
        },
        /**
         * Create a new Trello board.
         * Arguments: boardname - name of the board.
         *
         * Creating a new board takes some time (depending on the
         * speed of your internet connection), please be patient.
         *
         * If anything goes wrong, Up will let you know.
         * If you get an error, try setting the nightmare 'show'
         * option to 'true' (see ./trello/methods/newBoard.js).
         */
        {
            name: 'New Trello Board',
            question: [
                {
                    name: 'BOARDNAME',
                    type: 'input',
                    message: 'What is the name of your new board?',
                    filter: value => value.length ? value : console.log('Please give your board a name')
                }
            ],
            method: async boardname => {
                if (boardname === undefined) {
                    return false
                }
                return await newBoard(boardname)
            }
        }
    ]
}
