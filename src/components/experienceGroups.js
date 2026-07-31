import { byDateDesc } from "./dateUtils";

const sortByStartDate = byDateDesc("startDate");

export const EXPERIENCE_TYPES = ["academic", "professional", "associative"];

const typeOf = (xp) =>
  EXPERIENCE_TYPES.includes(xp.type) ? xp.type : "professional";

export const groupExperiences = (xps = []) =>
  EXPERIENCE_TYPES.map((type) => ({
    type,
    items: sortByStartDate(xps.filter((xp) => typeOf(xp) === type)),
  })).filter((group) => group.items.length > 0);
