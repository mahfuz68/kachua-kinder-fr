export const englishToBanglaNumber = (str: number | string | any) => {
  //check if the `str` is not string
  if (!isNaN(str)) {
    //if not string make it string forcefully
    str = String(str);
  }

  //start try catch block
  try {
    //keep the bangla numbers to an array
    var convert = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    //now split the provided string into array by each character
    var splitArray = str.split("");
    //declare a empty string
    var newString = "";
    //run a loop upto the length of the string array
    for (let i = 0; i < splitArray.length; i++) {
      //check if current array element if not number
      if (isNaN(splitArray[i])) {
        //if not number then place it as it is
        newString += splitArray[i];
      } else {
        //if number then get same numbered element from the bangla array
        newString += convert[splitArray[i]];
      }
    }
    //return the newly converted number
    return newString;
  } catch (err) {
    //if any error occured while convertion return the original string
    return str;
  }
  //by default return original number/string
  return str;
};

export const BanglaToEnglishNumber = (str: any) => {
  const conv: any = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };
  let pp = "";
  str.split("").forEach((element: any) => {
    pp += conv[element];
    // str.replace(new RegExp(element, "g"), conv[element]);
  });
  return pp;
};

export const getMonthName = (month: number) => {
  switch (month) {
    case 1:
      return "জানুয়ারি";
    case 2:
      return "ফেব্রুয়ারি";
    case 3:
      return "মার্চ";
    case 4:
      return "এপ্রিল";
    case 5:
      return "মে";
    case 6:
      return "জুন";
    case 7:
      return "জুলাই";
    case 8:
      return "আগস্ট";
    case 9:
      return "সেপ্টেম্বর";
    case 10:
      return "অক্টোবর";
    case 11:
      return "নভেম্বর";
    case 12:
      return "ডিসেম্বর";

    default:
      return "";
  }
};

export const convertToEngNumber = (str: any) => {
  if (+str) {
    return str;
  } else {
    return BanglaToEnglishNumber(str);
  }
};

export const velidClass = (cls: string) => {
  switch (cls) {
    case "NURSERY":
      return "নার্সারী";
    case "KG":
      return "কেজি";
    case "ONE":
      return "প্রথম";
    case "TWO":
      return "দ্বিতীয়";
    case "THREE":
      return "তৃতীয়";
    case "FOUR":
      return "চতুর্থ";
    case "FIVE":
      return "পঞ্চম";
  }
};
