import { useEffect, useState } from 'react'
import { Switch } from '@mui/material'
import { useSettingsQuery, useUpdateSettingsMutation } from '../redux/features/settingsApiSlice'
import { handleClickTrue } from '../redux/slices/SnackbarSlice'
import { useDispatch } from 'react-redux'


const DashboardSettings = () => {
    const { data: settings } = useSettingsQuery()
    const [updateSettings, { isLoading: isLoadingUpdate, error: errorUpdate }] = useUpdateSettingsMutation()
    const [shuffle, setShuffle] = useState((settings ?? {})[0]?.shuffle || false)
    const dispatch = useDispatch()

    useEffect(() => {
        setShuffle((settings ?? {})[0]?.shuffle || false)
    }, [settings])

    const handleUpdate = async () => {
        try {
            const { data } = await updateSettings({
                shuffle: shuffle
            })

            if (data.acknowledged) {
                dispatch(handleClickTrue({ message: "Updated Successfully", condition: "success" }))
            }
        } catch (error) {
            dispatch(handleClickTrue({ message: errorUpdate?.data?.message || "Something Error", condition: "error" }))
        }
    }

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center gap-3 min-h-[50px] max-lg:flex-col max-sm:text-center'>
                <div>
                    <h2 className='font-bold text-2xl'>Categories</h2>
                    <p className='text-xs'>Dashboard Categories</p>
                </div>
            </div>

            <div className='mt-5'>
                <div className='border rounded-md flex justify-between items-center py-2 px-4'>
                    <label htmlFor="switch" className='text-gray-500'>Shuffle For Products</label>
                    <Switch id='switch' checked={shuffle} onChange={(e) => setShuffle(e.target.checked)} />
                </div>
            </div>

            <button className="pink-button mt-10" onClick={handleUpdate} disabled={isLoadingUpdate}>{isLoadingUpdate ? "Loading..." : "Save"}</button>
        </div>
    )
}

export default DashboardSettings