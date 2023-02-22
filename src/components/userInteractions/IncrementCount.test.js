import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

/*
    clear: [Function: clear],

    copy: [Function: copy],
    cut: [Function: cut],
    deselectOptions: [Function: deselectOptions],
    keyboard: [AsyncFunction: keyboard],
    paste: [Function: paste],
    pointer: [AsyncFunction: pointer],
    selectOptions: [Function: selectOptions],
    tab: [Function: tab],
    type: [Function: type],
    upload: [Function: upload],
    setup: [Function: setupMain]

    1) Convinience APIs
    *******************
    Intéractions avec la souris
    - click()
    - dblClick()
    - tripleClick
    Les mouvements de la souris 
    - hover()
    - unhover()

    2) Pointer API
    Voir la doc : https://testing-library.com/docs/user-event/pointer

*/

import IncrementCount from "./IncrementCount";

describe('Learn User Interactions', () => {
    test("Le compteur et le bouton ainsi que le checkbox s'affichent dans le DOM", () => {
        render(<IncrementCount />)
        const headingElement = screen.getByRole('heading')
        expect(headingElement).toBeInTheDocument()

        const buttonElement = screen.getByRole('button', { name: /Vous avez cliqué \d+ fois/})
        expect(buttonElement).toBeInTheDocument()

        const checkbox = screen.getByRole('checkbox', { name: /J'accepte les termes et conditions/i})
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).not.toBeChecked()
    })

    test("avant clic, le compteur et le bouton affichent 0 & Bouton désactivé et orange ", () => {
        render(<IncrementCount />)
        const headingElement = screen.getByRole('heading')
        expect(headingElement).toHaveTextContent('0') // Test pass

        const buttonElement = screen.getByRole('button', { name: /Vous avez cliqué \d+ fois/})
        expect(buttonElement).toHaveTextContent('Vous avez cliqué 0 fois')
        expect(buttonElement).toBeDisabled()
        expect(buttonElement).toHaveStyle({'background-color': 'orange'}) 
    })

    test("Afficher le bouton après checkbox coché. Ensuite, le cacher après checkbox décoché", async () => {
        const user = userEvent.setup()
        render(<IncrementCount />)
        const checkbox = screen.getByRole('checkbox', { name: /J'accepte les termes et conditions/i})
        await user.click(checkbox)
        expect(checkbox).toBeChecked()

        const buttonElement = screen.getByRole('button', { name: /Vous avez cliqué \d+ fois/})
        expect(buttonElement).toBeEnabled()

        await user.click(checkbox)
        expect(checkbox).not.toBeChecked()
        expect(buttonElement).toBeDisabled()

        await user.dblClick(checkbox)
        expect(checkbox).not.toBeChecked()
        expect(buttonElement).toBeDisabled()
        
    })

    test("Compteur et bouton affichent 3 après 1 clic + un dblClick + couleur du bouton change en cyan", async () => {
        const user = userEvent.setup()
        render(<IncrementCount />)
        const checkbox = screen.getByRole('checkbox', { name: /J'accepte les termes et conditions/i})
        await user.click(checkbox)

        const buttonElement = screen.getByRole('button', { name: /Vous avez cliqué \d+ fois/})
        expect(buttonElement).toBeEnabled()

        await user.click(buttonElement)
        expect(buttonElement).toHaveTextContent('Vous avez cliqué 1 fois')
        const headingElement = screen.getByRole('heading')
        expect(headingElement).toHaveTextContent('1')
        expect(buttonElement).toHaveStyle({'background-color': 'cyan'})

        await user.dblClick(buttonElement)
        expect(buttonElement).toHaveTextContent('Vous avez cliqué 3 fois')
        expect(headingElement).toHaveTextContent('3')
        expect(buttonElement).toHaveStyle({'background-color': 'cyan'})
        await user.click(checkbox)
        expect(buttonElement).toBeDisabled()

    })

    test("Compteur et bouton affichent 2 après 2 clics + couleur du bouton change en orange", async () => {
        const user = userEvent.setup()
        render(<IncrementCount />)
        const checkbox = screen.getByRole('checkbox', { name: /j'accepte les termes et conditions/i})
        await user.click(checkbox)
        const buttonElement = screen.getByRole('button', { name: /Vous avez cliqué \d+ fois/})
        expect(buttonElement).toBeEnabled()
        
        await user.dblClick(buttonElement)
        expect(buttonElement).toHaveTextContent('Vous avez cliqué 2 fois')

        const headingElement = screen.getByRole('heading')
        expect(headingElement).toHaveTextContent('2')

        expect(buttonElement).toHaveStyle({'background-color': 'orange'})
    })
});
