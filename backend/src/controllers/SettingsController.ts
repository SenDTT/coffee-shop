import { RequestHandler } from "express";
import { IErrorResponse, IResponseData } from "../types/Common";
import { ISettingParams, ISettingsBody } from "../types/SettingsStypes";
import {
  getSettingsByQuery,
  updateSettingsByGroup,
} from "../services/SettingsService";

export const getSettingsController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  ISettingParams
> = async (req, res, next) => {
  const { group, key } = req.query;
  const filter: Record<string, any> = {};

  if (group) {
    filter.group = group;
  }

  if (key) {
    filter.key = key;
  }

  try {
    const data = await getSettingsByQuery(filter);

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateSettingsController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  ISettingsBody
> = async (req, res, next) => {
  const { data, group } = req.body;

  try {
    await updateSettingsByGroup(group, data);

    res.json({ success: true, data: null, message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
};
