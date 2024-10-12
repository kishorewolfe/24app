import React from 'react'

type Props = {}

const SettingsPage = (props: Props) => {
  return (
    <div><div className="bg-gray-200 h-screen w-full  flex p-20">

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:py-4 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Profile Settings
            </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
            <div className="bg-white overflow-hidden shadow sm:rounded-lg ">
                <div className="px-4 py-5 sm:p-6">
                    <dl>
                        <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Change Password
                            </dt>
                        <dd className="mt-1 text-3xl leading-9 font-semibold text-cyan-900">Click here</dd>
                    </dl>
                </div>
            </div>
            <div className="bg-white overflow-hidden shadow sm:rounded-lg ">
                <div className="px-4 py-5 sm:p-6">
                    <dl>
                        <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Send Message to admin
                            </dt>
                        <dd className="mt-1 text-3xl leading-9 font-semibold text-cyan-900">Click here
                        </dd>
                    </dl>
                </div>
            </div>
            <div className="bg-white overflow-hidden shadow sm:rounded-lg ">
                <div className="px-4 py-5 sm:p-6">
                    <dl>
                        <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Update Profile
                            </dt>
                        <dd className="mt-1 text-3xl leading-9 font-semibold text-cyan-900">Click here</dd>
                    </dl>
                </div>
            </div>
            <div className="bg-white overflow-hidden shadow sm:rounded-lg ">
                <div className="px-4 py-5 sm:p-6">
                    <dl>
                        <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Delete Account
                        </dt>
                        <dd className="mt-1 text-3xl leading-9 font-semibold text-red-700">166.7K
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</div></div>
  )
}

export default SettingsPage