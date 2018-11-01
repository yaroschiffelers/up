/**
 * @fileoverview Create a new Trello board. Part of the Trello Up Module.
 * @author Yaro Schiffelers - 2018
 * @license MIT
 */
'use strict'

const ora = require('ora')
const Nightmare = require('nightmare')
const nightmare = Nightmare({
    // The Dev Tools screen is only visible if show is set to true.
    openDevTools: {
        mode: 'detach'
    },
    // Set this to 'true' if you run into unexpected errors,
    // or if you want a better debugging experience.
    show: false
})

const newBoard = async boardname => {
    /**
     * Start the CLI spinner (loader).
     * @type {ora}
     */
    const spinner = ora('Creating Board').start()

    /**
     * Use Nightmare (Electron based) to try to login to Trello
     * and create a new board.
     */
    try {
        return await nightmare
            .goto('https://trello.com/login')
            .wait('#user')
            .insert('#user', __env.TRELLO_USERNAME)
            .insert('#password', __env.TRELLO_PASSWORD)
            .click('#login')
            // Add items sub menu button.
            .wait(
                '#header > div.header-user > a.header-btn.js-open-add-menu > span'
            )
            .click(
                '#header > div.header-user > a.header-btn.js-open-add-menu > span'
            )
            // Create new board button.
            .wait(
                '#classic > div.pop-over.is-shown > div > div:nth-child(2) > div > div > div > ul > li:nth-child(1) > a'
            )
            .click(
                '#classic > div.pop-over.is-shown > div > div:nth-child(2) > div > div > div > ul > li:nth-child(1) > a'
            )
            // New board name input element.
            .wait(
                '#classic > div.window-overlay.mod-no-chrome-overlay > div > div > div > form > div > div > div:nth-child(2) > input'
            )
            // Insert the board name.
            .insert(
                '#classic > div.window-overlay.mod-no-chrome-overlay > div > div > div > form > div > div > div:nth-child(2) > input',
                boardname
            )
            .wait(3000)
            // Save new board button.
            .click(
                '#classic > div.window-overlay.mod-no-chrome-overlay > div > div > div > form > button'
            )
            // Wait until the board is created and loaded (this selector points to the board header).
            .wait(
                '#content > div > div.board-main-content > div.board-header.u-clearfix.js-board-header'
            )
            // Copy the URL
            .url()
            .end()
            .then(res => {
                spinner.succeed(`Board Created`)
                spinner.succeed(`Board URL: ${res}`)
                return res
            })
            .catch(err => {
                spinner.fail(`Error occurred: ${err}`)
                return err
            })
    } catch (err) {
        return err
    }
}

module.exports = newBoard
