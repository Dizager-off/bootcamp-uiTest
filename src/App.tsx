import React from 'react'
import {Bar, BarButton, BarMenuItem, BarDivider, SubBar, BarDate} from '@v-uik/bar';
import {ReactComponent as PeopleLogo} from './assets/people.svg'
import {ReactComponent as Logo} from './assets/logo.svg'
import {Good} from './Good';

function App() {
    return <>
        <Bar kind="light">
            <BarButton icon={<Logo/>}/>
            <BarDate/>
            <BarMenuItem style={{marginLeft: 'auto'}}>Администратор</BarMenuItem>
            <BarDivider/>
            <BarButton icon={<PeopleLogo/>}/>
        </Bar>
        <SubBar kind="light"
            style={{
                top: 48
            }}
        >
            <BarMenuItem>Доставка</BarMenuItem>
            <BarMenuItem>Товары</BarMenuItem>
            <BarMenuItem>Адреса складов</BarMenuItem>
        </SubBar>
    </>
}

export default App