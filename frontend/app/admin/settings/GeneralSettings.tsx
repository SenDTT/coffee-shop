// components/admin/settings/GeneralSettings.tsx
export default function GeneralSettings() {
    return (
        <div className="space-y-4 p-4 gap-4 justify-end items-end">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 text-sm font-medium">Shop Name</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Coffee & Beans" />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium">Contact Email</label>
                    <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="support@coffeebeans.com" />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium">Phone Number</label>
                    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="(123) 456-7890" />
                </div>
                <div>
                    <label htmlFor="timezone" className="block mb-1 text-sm font-medium">Timezone</label>
                    <select
                        id="timezone"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="EST">EST (Eastern)</option>
                        <option value="PST">PST (Pacific)</option>
                        <option value="CST">CST (Central)</option>
                    </select>
                </div>
            </div>
            <button className="mt-4 px-6 py-2 text-sm bg-coastal-light-text text-coastal-light-bg rounded-md hover:bg-coastal-light-text/80">Save Changes</button>
        </div>
    );
}

// You can follow this UI style for the other components to build a consistent and clean layout.
// Would you like me to continue and build the rest of the 9 settings components with full form UIs too?
