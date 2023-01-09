const getQueryParams = ({ loadOptions, ignoreDeleted = false }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps

  let params = [];

  //["attributes.name", "contains", "44"]

  ["sort", "filter"].forEach(function (i) {
    if (i in loadOptions && isNotEmpty(loadOptions[i]))
      switch (i) {
        case "sort":
          params.push(
            loadOptions.sort
              .map(
                (s, index) =>
                  `sort[${index}]=${`${s.selector.replace("attributes.", "")}:${
                    s.desc ? "desc" : "asc"
                  }`}`
              )
              .join("&")
          );
          break;

        case "filter":
          params = params
            .concat(getFilter(loadOptions.filter))
            .map((p, index) => p.replace("index", index));

          break;
        default:
          break;
      }
  });

  if (ignoreDeleted) {
    params.push(`filters[deleted][$eq][${params.length + 1}]=false`);
  }

  params = "&" + params.join("&");

  return params;
};

const getOperator = (ops) => {
  switch (ops) {
    case "contains":
      return "$containsi";
    case "notcontains":
      return "$notContainsi";
    case "startswith":
      return "$startsWith";
    case "endswith":
      return "$endsWith";
    case "=":
      return "$eqi";
    case "<>":
      return "$ne";
    case "<":
      return "$lt";
    case "<=":
      return "$lte";
    case ">":
      return "$gt";
    case ">=":
      return "$gte";
    case "and":
      return "$between";

    default:
      break;
  }
};

const getFilter = (filter, index) => {
  let params = [];
  if (Array.isArray(filter[0])) {
    filter
      .filter((s) => s !== "and")
      .forEach((f) => (params = params.concat(getFilter(f, index))));
  } else {
    return `filters[${`${filter[0].replace("attributes.", "")}][${getOperator(
      filter[1]
    )}][index]=${filter[2]}`}`;
  }
  return params;
};

const isNotEmpty = (value) => {
  return value !== undefined && value !== null && value !== "";
};

export default getQueryParams;
