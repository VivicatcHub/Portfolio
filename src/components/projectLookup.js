export const findBundle = (groups = [], id) => {
  for (const group of groups) {
    for (const item of group.items || []) {
      if (item.id === id && item.subProjects) {
        return { bundle: item, category: group.category };
      }
    }
  }
  return null;
};

export const findProject = (groups = [], id) => {
  for (const group of groups) {
    for (const item of group.items || []) {
      if (item.subProjects) {
        const sub = item.subProjects.find((child) => child.id === id);
        if (sub)
          return { project: sub, bundle: item, category: group.category };
        continue;
      }
      if (item.id === id) {
        return { project: item, bundle: null, category: group.category };
      }
    }
  }
  return null;
};
