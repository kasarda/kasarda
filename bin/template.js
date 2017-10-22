/**! @license
  * template.js
  *
  * This source code is licensed under the GNU GENERAL PUBLIC LICENSE found in the
  * LICENSE file in the root directory of this source tree.
  *
  * Copyright (c) 2017-Present, Filip Kasarda
  *
  */



/**
 *
 * Get import statemant in typescript template
 * of css file or empty string
 *
 * @function importCss
 * @param {string} component
 * @param {boolean} css
 * @param {string} ext
 * @return {string}
 *
 */
function importCss(component, css, ext) {
    return css === true ? `import './${component}.${ext}'\n` : ''
}




module.exports = {

    /**
     *
     * Generate template for class react component using css
     *
     * @param {string} component
     * @param {boolean} css
     * @param {string} ext
     *
     */

    class(component, css, ext) {
        return `${importCss(component, css, ext)}import * as React from 'react'
import { connect } from 'react-redux'

class ${component} extends React.Component<{}> {
    render() {
        return (
            <div id="${component}">
                <h2>${component} works!</h2>
            </div>
        )
    }
}

export default connect()(${component})`
    },







    /**
     *
     * Generate template for functional react component using css
     *
     * @param {string} component
     * @param {boolean} css
     * @param {string} ext
     *
     */

    functional(component, css, ext) {
        return `${importCss(component, css, ext)}import * as React from 'react'
import { connect } from 'react-redux'

const ${component}: React.SFC<{}> = () => {
    return (
        <div id="${component}">
            <h2>${component} works!</h2>
        </div>
    )
}

export default connect()(${component})`

    },





    /**
     *
     * Generate css template
     *
     * @param {string} component
     *
     */
    css(component) {
        return `
#${component} h2 {
    color: #444;
}`
    },






    /**
     *
     * Generate sass template
     *
     * @param {string} component
     *
     */

    sass(component) {
        return `@import "~ts-modules/lib"

#${component}
    h2
        color: #444`
    },





    /**
     *
     * Generate scss template
     *
     * @param {string} component
     *
     */

    scss(component) {
        return `@import "~ts-modules/lib";

#${component} {
    h2 {
        color: #444;
    }
}`
    }


}
