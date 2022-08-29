import { splitApi } from '../../store/query/splitApi'
import { IUser } from './userTypes'
import storageService from '../../utils/storageService'

interface LoginRes {
    token: string
    user: IUser
}

export const userApi = splitApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginRes, string>({
            query: (code: string) => ({
                url: '/users/login/wx/web',
                method: 'POST',
                body: { loginCode: code },
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                const { data } = await queryFulfilled
                storageService.setUserInfo(data.token, data.user.displayId)
            },
        }),
    }),
})

export const { useLoginMutation } = userApi
