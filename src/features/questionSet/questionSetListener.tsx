import { setOptionSelected } from './questionSetSlice'
import { Unsubscribe } from '@reduxjs/toolkit'
import type { AppListenerEffectAPI, AppStartListening } from '../../store/store'

function onOptionPicked(
    { payload }: ReturnType<typeof setOptionSelected>,
    { dispatch, getState, getOriginalState, condition }: AppListenerEffectAPI
) {
    const state = getState()
    const optionsSelected = state.questionSet.optionsSelected
    console.log(`after increment, state is ${optionsSelected}`)
}

export function setupQuestionSetListeners(
    startListening: AppStartListening
): Unsubscribe {
    const subscriptions = [
        startListening({
            actionCreator: setOptionSelected,
            effect: onOptionPicked,
        }),
    ]

    return () => {
        subscriptions.forEach((unsubscribe) => unsubscribe())
    }
}
