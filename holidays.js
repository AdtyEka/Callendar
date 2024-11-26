// Data hari libur nasional
const holidays = {
    '2019': {
        '1-1': 'Tahun Baru',
        '2-5': 'Tahun Baru Imlek',
        '3-7': 'Hari Raya Nyepi',
        '4-19': 'Wafat Isa Almasih',
        '6-5': 'Hari Raya Idul Fitri',
        // Tambahkan data lain...
    },
    '2020': { /* Data */ },
    '2021': { /* Data */ },
    '2022': { /* Data */ },
    '2023': { /* Data */ },
    '2024': {
        '1-1': 'Tahun Baru',
        '2-8': 'Tahun Baru Imlek',
        '3-10': 'Isra Miraj',
        '3-29': 'Wafat Isa Almasih',
        '4-10': 'Hari Raya Idul Fitri',
        '4-11': 'Hari Raya Idul Fitri',
        '5-1': 'Hari Buruh Internasional',
        '5-9': 'Kenaikan Isa Almasih',
        '6-1': 'Hari Lahir Pancasila',
        '6-17': 'Hari Raya Idul Adha',
        '7-7': 'Tahun Baru Islam',
        '8-17': 'Hari Kemerdekaan RI',
        '9-28': 'Maulid Nabi Muhammad SAW',
        '12-25': 'Hari Natal'
    }
};



// Fungsi untuk mengecek apakah tanggal tertentu adalah hari libur
function isHoliday(date) {
    const year = date.getFullYear();
    const dateStr = `${date.getMonth() + 1}-${date.getDate()}`;
    return holidays[year] && holidays[year][dateStr];
}

// Fungsi untuk mendapatkan nama hari libur
function getHolidayName(date) {
    const year = date.getFullYear();
    const dateStr = `${date.getMonth() + 1}-${date.getDate()}`;
    return holidays[year] ? holidays[year][dateStr] : null;
}