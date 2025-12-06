// features/destinyMatrix/destiny.utils.ts
// Ported from DestinyMatrix/src/code.js

export interface PersonData {
  points: Points;
  purposes: Purposes;
  chartHeart: ChartHeart;
  years: Years;
}

export interface Points {
  apoint: number;
  bpoint: number;
  cpoint: number;
  dpoint: number;
  epoint: number;
  fpoint: number;
  gpoint: number;
  hpoint: number;
  ipoint: number;
  jpoint: number;
  kpoint: number;
  lpoint: number;
  mpoint: number;
  npoint: number;
  opoint: number;
  ppoint: number;
  qpoint: number;
  rpoint: number;
  spoint: number;
  tpoint: number;
  upoint: number;
  vpoint: number;
  wpoint: number;
  xpoint: number;
  f2point: number;
  f1point: number;
  g2point: number;
  g1point: number;
  i2point: number;
  i1point: number;
  h2point: number;
  h1point: number;
}

export interface Purposes {
  skypoint: number;
  earthpoint: number;
  perspurpose: number;
  femalepoint: number;
  malepoint: number;
  socialpurpose: number;
  generalpurpose: number;
  planetarypurpose: number;
}

export interface ChartHeart {
  sahphysics: number;
  ajphysics: number;
  vishphysics: number;
  anahphysics: number;
  manphysics: number;
  svadphysics: number;
  mulphysics: number;
  sahenergy: number;
  ajenergy: number;
  vishenergy: number;
  anahenergy: number;
  manenergy: number;
  svadenergy: number;
  mulenergy: number;
  sahemotions: number;
  ajemotions: number;
  vishemotions: number;
  anahemotions: number;
  manemotions: number;
  svademotions: number;
  mulemotions: number;
}

export interface Years {
  afpoint: number;
  af1point: number;
  af2point: number;
  af3point: number;
  af4point: number;
  af5point: number;
  af6point: number;
  fbpoint: number;
  fb1point: number;
  fb2point: number;
  fb3point: number;
  fb4point: number;
  fb5point: number;
  fb6point: number;
  bgpoint: number;
  bg1point: number;
  bg2point: number;
  bg3point: number;
  bg4point: number;
  bg5point: number;
  bg6point: number;
  gcpoint: number;
  gc1point: number;
  gc2point: number;
  gc3point: number;
  gc4point: number;
  gc5point: number;
  gc6point: number;
  cipoint: number;
  ci1point: number;
  ci2point: number;
  ci3point: number;
  ci4point: number;
  ci5point: number;
  ci6point: number;
  idpoint: number;
  id1point: number;
  id2point: number;
  id3point: number;
  id4point: number;
  id5point: number;
  id6point: number;
  dhpoint: number;
  dh1point: number;
  dh2point: number;
  dh3point: number;
  dh4point: number;
  dh5point: number;
  dh6point: number;
  hapoint: number;
  ha1point: number;
  ha2point: number;
  ha3point: number;
  ha4point: number;
  ha5point: number;
  ha6point: number;
}


/**
 * Reduces a number to a single digit or master number (11, 22, 33)
 * If number > 22, reduces by adding digits
 */
export function reduceNumber(number: number): number {
  let num = number;
  if (number > 22) {
    num = (number % 10) + Math.floor(number / 10);
  }
  return num;
}

/**
 * Calculates life path number from date (sum of day, month, year, reduced)
 */
export function calculateLifePath(day: number, month: number, year: number): number {
  let lifePath = day + month + year;
  while (lifePath > 9 && lifePath !== 11 && lifePath !== 22 && lifePath !== 33) {
    lifePath = (lifePath % 10) + Math.floor(lifePath / 10);
  }
  return lifePath;
}

/**
 * Calculates year number by summing all digits and reducing
 */
export function calculateYear(year: number): number {
  let y = 0;
  let yearCopy = year;
  while (yearCopy > 0) {
    y += yearCopy % 10;
    yearCopy = Math.floor(yearCopy / 10);
  }
  return reduceNumber(y);
}

/**
 * Main calculation function - calculates all points from a, b, c points
 */
export function calculatePoints(aPoint: number, bPoint: number, cPoint: number): {
  points: Points;
  purposes: Purposes;
  chartHeart: ChartHeart;
  years: Years;
} {
  const dpoint = reduceNumber(aPoint + bPoint + cPoint);
  const epoint = reduceNumber(aPoint + bPoint + cPoint + dpoint);
  const fpoint = reduceNumber(aPoint + bPoint);
  const gpoint = reduceNumber(bPoint + cPoint);
  const hpoint = reduceNumber(dpoint + aPoint);
  const ipoint = reduceNumber(cPoint + dpoint);
  const jpoint = reduceNumber(dpoint + epoint);

  const npoint = reduceNumber(cPoint + epoint);
  const lpoint = reduceNumber(jpoint + npoint);
  const mpoint = reduceNumber(lpoint + npoint);
  const kpoint = reduceNumber(jpoint + lpoint);

  const qpoint = reduceNumber(npoint + cPoint);
  const rpoint = reduceNumber(jpoint + dpoint);
  const spoint = reduceNumber(aPoint + epoint);
  const tpoint = reduceNumber(bPoint + epoint);

  const opoint = reduceNumber(aPoint + spoint);
  const ppoint = reduceNumber(bPoint + tpoint);

  const upoint = reduceNumber(fpoint + gpoint + hpoint + ipoint);
  const vpoint = reduceNumber(epoint + upoint);
  const wpoint = reduceNumber(spoint + epoint);
  const xpoint = reduceNumber(tpoint + epoint);

  const f2point = reduceNumber(fpoint + upoint);
  const f1point = reduceNumber(fpoint + f2point);
  const g2point = reduceNumber(gpoint + upoint);
  const g1point = reduceNumber(gpoint + g2point);
  const i2point = reduceNumber(ipoint + upoint);
  const i1point = reduceNumber(ipoint + i2point);
  const h2point = reduceNumber(hpoint + upoint);
  const h1point = reduceNumber(hpoint + h2point);

  // Years calculations
  const afpoint = reduceNumber(aPoint + fpoint);
  const af1point = reduceNumber(aPoint + afpoint);
  const af2point = reduceNumber(aPoint + af1point);
  const af3point = reduceNumber(afpoint + af1point);
  const af4point = reduceNumber(afpoint + fpoint);
  const af5point = reduceNumber(afpoint + af4point);
  const af6point = reduceNumber(af4point + fpoint);
  const fbpoint = reduceNumber(fpoint + bPoint);
  const fb1point = reduceNumber(fpoint + fbpoint);
  const fb2point = reduceNumber(fpoint + fb1point);
  const fb3point = reduceNumber(fbpoint + fb1point);
  const fb4point = reduceNumber(fbpoint + bPoint);
  const fb5point = reduceNumber(fbpoint + fb4point);
  const fb6point = reduceNumber(fb4point + bPoint);
  const bgpoint = reduceNumber(bPoint + gpoint);
  const bg1point = reduceNumber(bPoint + bgpoint);
  const bg2point = reduceNumber(bPoint + bg1point);
  const bg3point = reduceNumber(bgpoint + bg1point);
  const bg4point = reduceNumber(bgpoint + gpoint);
  const bg5point = reduceNumber(bgpoint + bg4point);
  const bg6point = reduceNumber(bg4point + gpoint);
  const gcpoint = reduceNumber(gpoint + cPoint);
  const gc1point = reduceNumber(gpoint + gcpoint);
  const gc2point = reduceNumber(gpoint + gc1point);
  const gc3point = reduceNumber(gcpoint + gc1point);
  const gc4point = reduceNumber(gcpoint + cPoint);
  const gc5point = reduceNumber(gcpoint + gc4point);
  const gc6point = reduceNumber(gc4point + cPoint);
  const cipoint = reduceNumber(cPoint + ipoint);
  const ci1point = reduceNumber(cPoint + cipoint);
  const ci2point = reduceNumber(cPoint + ci1point);
  const ci3point = reduceNumber(cipoint + ci1point);
  const ci4point = reduceNumber(cipoint + ipoint);
  const ci5point = reduceNumber(cipoint + ci4point);
  const ci6point = reduceNumber(ci4point + ipoint);
  const idpoint = reduceNumber(ipoint + dpoint);
  const id1point = reduceNumber(ipoint + idpoint);
  const id2point = reduceNumber(ipoint + id1point);
  const id3point = reduceNumber(idpoint + id1point);
  const id4point = reduceNumber(idpoint + dpoint);
  const id5point = reduceNumber(idpoint + id4point);
  const id6point = reduceNumber(id4point + dpoint);
  const dhpoint = reduceNumber(dpoint + hpoint);
  const dh1point = reduceNumber(dpoint + dhpoint);
  const dh2point = reduceNumber(dpoint + dh1point);
  const dh3point = reduceNumber(dhpoint + dh1point);
  const dh4point = reduceNumber(dhpoint + hpoint);
  const dh5point = reduceNumber(dhpoint + dh4point);
  const dh6point = reduceNumber(dh4point + hpoint);
  const hapoint = reduceNumber(hpoint + aPoint);
  const ha1point = reduceNumber(hpoint + hapoint);
  const ha2point = reduceNumber(hpoint + ha1point);
  const ha3point = reduceNumber(hapoint + ha1point);
  const ha4point = reduceNumber(hapoint + aPoint);
  const ha5point = reduceNumber(hapoint + ha4point);
  const ha6point = reduceNumber(ha4point + aPoint);

  // Purposes
  const skypoint = reduceNumber(bPoint + dpoint);
  const earthpoint = reduceNumber(aPoint + cPoint);
  const perspurpose = reduceNumber(skypoint + earthpoint);
  const femalepoint = reduceNumber(gpoint + hpoint);
  const malepoint = reduceNumber(fpoint + ipoint);
  const socialpurpose = reduceNumber(femalepoint + malepoint);
  const generalpurpose = reduceNumber(perspurpose + socialpurpose);
  const planetarypurpose = reduceNumber(socialpurpose + generalpurpose);

  const points: Points = {
    apoint: aPoint,
    bpoint: bPoint,
    cpoint: cPoint,
    dpoint,
    epoint,
    fpoint,
    gpoint,
    hpoint,
    ipoint,
    jpoint,
    kpoint,
    lpoint,
    mpoint,
    npoint,
    opoint,
    ppoint,
    qpoint,
    rpoint,
    spoint,
    tpoint,
    upoint,
    vpoint,
    wpoint,
    xpoint,
    f2point,
    f1point,
    g2point,
    g1point,
    i2point,
    i1point,
    h2point,
    h1point,
  };

  const purposes: Purposes = {
    skypoint,
    earthpoint,
    perspurpose,
    femalepoint,
    malepoint,
    socialpurpose,
    generalpurpose,
    planetarypurpose,
  };

  const chartHeart: ChartHeart = {
    sahphysics: aPoint,
    ajphysics: opoint,
    vishphysics: spoint,
    anahphysics: wpoint,
    manphysics: epoint,
    svadphysics: jpoint,
    mulphysics: cPoint,
    sahenergy: bPoint,
    ajenergy: ppoint,
    vishenergy: tpoint,
    anahenergy: xpoint,
    manenergy: epoint,
    svadenergy: npoint,
    mulenergy: dpoint,
    sahemotions: reduceNumber(aPoint + bPoint),
    ajemotions: reduceNumber(opoint + ppoint),
    vishemotions: reduceNumber(spoint + tpoint),
    anahemotions: reduceNumber(wpoint + xpoint),
    manemotions: reduceNumber(epoint + epoint),
    svademotions: reduceNumber(jpoint + npoint),
    mulemotions: reduceNumber(cPoint + dpoint),
  };

  const years: Years = {
    afpoint,
    af1point,
    af2point,
    af3point,
    af4point,
    af5point,
    af6point,
    fbpoint,
    fb1point,
    fb2point,
    fb3point,
    fb4point,
    fb5point,
    fb6point,
    bgpoint,
    bg1point,
    bg2point,
    bg3point,
    bg4point,
    bg5point,
    bg6point,
    gcpoint,
    gc1point,
    gc2point,
    gc3point,
    gc4point,
    gc5point,
    gc6point,
    cipoint,
    ci1point,
    ci2point,
    ci3point,
    ci4point,
    ci5point,
    ci6point,
    idpoint,
    id1point,
    id2point,
    id3point,
    id4point,
    id5point,
    id6point,
    dhpoint,
    dh1point,
    dh2point,
    dh3point,
    dh4point,
    dh5point,
    dh6point,
    hapoint,
    ha1point,
    ha2point,
    ha3point,
    ha4point,
    ha5point,
    ha6point,
  };

  return { points, purposes, chartHeart, years };
}

/**
 * Creates a person data object from date string (YYYY-MM-DD format) and gender
 */
export function createPersonFromDate(dateIso: string, gender: 'male' | 'female'): PersonData {
  const splitDate = dateIso.split('-');
  const day = parseInt(splitDate[2], 10);
  const month = parseInt(splitDate[1], 10);
  const year = parseInt(splitDate[0], 10);

  const apoint = reduceNumber(day);
  const bpoint = month;
  const cpoint = calculateYear(year);

  const data = calculatePoints(apoint, bpoint, cpoint);
  
  // Store gender in the data object for later use
  // Note: PersonData doesn't have a gender field, but we can add it if needed
  // For now, we'll use it in the calculation logic if needed
  
  return data;
}

/**
 * Validates date string (YYYY-MM-DD format)
 */
export function validateDate(dateIso: string): { valid: boolean; error?: string } {
  if (!dateIso) {
    return { valid: false, error: 'Date is required' };
  }

  const date = new Date(dateIso);
  if (isNaN(date.getTime())) {
    return { valid: false, error: 'Invalid date format' };
  }

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (date > today) {
    return { valid: false, error: "Date can't be in the future" };
  }

  const ancientDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
  if (date < ancientDate) {
    return { valid: false, error: "Date can't be more than 120 years ago" };
  }

  return { valid: true };
}

/**
 * Validates name (letters, dash, space only)
 */
export function validateName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim() === '') {
    return { valid: false, error: 'Name is required' };
  }

  const nameRegex = /^[а-яёa-z\-\s]*$/i;
  if (!nameRegex.test(name)) {
    return {
      valid: false,
      error: 'Name format is incorrect: allowed characters are letters, dash and space. Example: Anna, Anna-Maria, Anna Maria.',
    };
  }

  return { valid: true };
}

/**
 * Formats date from YYYY-MM-DD to DD.MM.YYYY
 */
export function formatDate(dateIso: string): string {
  const splitDate = dateIso.split('-');
  return `${splitDate[2]}.${splitDate[1]}.${splitDate[0]}`;
}

/**
 * Converts DD/MM/YYYY to YYYY-MM-DD (ISO format)
 */
export function convertDDMMYYYYToISO(dateStr: string): string {
  if (!dateStr) return '';
  
  // Remove any non-digit characters except slashes
  const cleaned = dateStr.replace(/[^\d/]/g, '');
  const parts = cleaned.split('/');
  
  if (parts.length !== 3) return '';
  
  const day = parts[0].padStart(2, '0');
  const month = parts[1].padStart(2, '0');
  const year = parts[2];
  
  // Validate basic format
  if (day.length !== 2 || month.length !== 2 || year.length !== 4) return '';
  
  return `${year}-${month}-${day}`;
}

/**
 * Formats input to DD/MM/YYYY as user types
 */
export function formatDateInput(value: string): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  // Limit to 8 digits (DDMMYYYY)
  const limited = digits.slice(0, 8);
  
  // Add slashes
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 4) {
    return `${limited.slice(0, 2)}/${limited.slice(2)}`;
  } else {
    return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
  }
}

/**
 * Converts ISO date (YYYY-MM-DD) to DD/MM/YYYY format
 */
export function convertISOToDDMMYYYY(dateISO: string): string {
  if (!dateISO) return '';
  const parts = dateISO.split('-');
  if (parts.length !== 3) return '';
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

/**
 * Title case a string
 */
export function titleCase(str: string): string {
  return str.replace(/^[a-zа-яё]|[\-\s][a-zа-яё]/g, (a) => a.toUpperCase());
}
