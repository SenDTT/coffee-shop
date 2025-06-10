import { Setting, SettingModel } from "../models/Settings";
import { IDataOfSettingBody } from "../types/SettingsStypes";

export const getSettingsByQuery = async (filter: Record<string, any>) => {
  try {
    const settings: Setting[] | null = await SettingModel.find(filter);

    return settings;
  } catch (err) {
    console.log("Error fetching settings - ", err);
    throw err;
  }
};

export const updateSettingsByGroup = async (
  group: string,
  data: IDataOfSettingBody
) => {
  try {
    Object.entries(data).forEach(async ([key, value]) => {
      await SettingModel.updateOne(
        { group, key },
        { $set: { value } },
        { upsert: true }
      );
    });
  } catch (err) {
    console.log("Error fetching settings - ", err);
    throw err;
  }
};
