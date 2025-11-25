import React, {useState} from 'react'
import {Bar, BarButton, BarMenuItem, BarDivider, SubBar, BarDate} from '@v-uik/bar'
import {ReactComponent as PeopleLogo} from './assets/people.svg'
import {ReactComponent as Logo} from './assets/logo.svg'
import {Good} from './Good'
import {NotificationContainer} from "@v-uik/notification"
import {Darkstore} from "./Darkstore"

function App() {
    const [activeTab, setActiveTab] = useState<'delivery' | 'goods' | 'darkstores'>('darkstores')

    return <>
        <Bar kind="light">
            <BarButton icon={<Logo/>}/>
            <BarDate/>
            <BarMenuItem style={{marginLeft: 'auto'}}>Администратор</BarMenuItem>
            <BarDivider/>
            <BarButton icon={<PeopleLogo/>}/>
        </Bar>
        <SubBar
            kind="light"
            style={{
                top: 48
            }}
        >
            <BarMenuItem selected={activeTab === 'delivery'} onClick={() => setActiveTab('delivery')}>
                Доставка
            </BarMenuItem>
            <BarMenuItem selected={activeTab === 'goods'} onClick={() => setActiveTab('goods')}>
                Товары
            </BarMenuItem>
            <BarMenuItem selected={activeTab === 'darkstores'} onClick={() => setActiveTab('darkstores')}>
                Адреса складов
            </BarMenuItem>
        </SubBar>
        {activeTab === 'goods' && <Good/>}
        {activeTab === 'darkstores' && <Darkstore/>}
        <NotificationContainer
            position="top-right"
            autoClose={5000}
            limit={1}
            closeButtonAriaLabel="Закрыть"
        />
    </>
}

export default App
