import axios from 'axios';

// import { API_DEV, API_PROD, API_ENV } from "react-native-dotenv";

const MODE = 'PROD';
const API_DEV = 'http://10.0.2.2:3001/';
const API_PROD = 'http://116.193.190.138:8080/';

const instance = axios.create({
  baseURL: MODE === 'DEV' ? API_DEV : API_PROD,
  timeout: 10000,
});

const api = {
  deleteDaftarObat: async id => {
    try {
      const res = await instance.delete(`daftar_obat/deleteDaftarObat/${id}`);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  putDaftarObat: async (payload, id) => {
    try {
      const res = await instance.put(
        `daftar_obat/putDaftarObat/${id}`,
        payload,
      );
      return res.data;
    } catch (err) {
      return err;
    }
  },
  createDaftarObat: async payload => {
    try {
      const res = await instance.post('daftar_obat/createDaftarObat', payload);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  fetchAllDaftarObat: async nim => {
    try {
      const res = await instance.get('daftar_obat/fetchAllDaftarObat');
      return res.data;
    } catch (err) {
      return err;
    }
  },

  // GOLONGAN OBAT
  fetchAllGolonganObat: async nim => {
    try {
      const res = await instance.get('golongan_obat/fetchAllGolonganObat');
      return res.data;
    } catch (err) {
      return err;
    }
  },
  deleteGolonganObat: async id => {
    try {
      const res = await instance.delete(
        `golongan_obat/deleteGolonganObat/${id}`,
      );
      return res.data;
    } catch (err) {
      return err;
    }
  },
  putGolonganObat: async (payload, id) => {
    try {
      const res = await instance.put(
        `golongan_obat/putGolonganObat/${id}`,
        payload,
      );
      return res.data;
    } catch (err) {
      return err;
    }
  },
  createGolonganObat: async payload => {
    try {
      const res = await instance.post(
        'golongan_obat/createGolonganObat',
        payload,
      );
      return res.data;
    } catch (err) {
      return err;
    }
  },

  // JENIS KELUHAN
  fetchAllJenisKeluhan: async nim => {
    try {
      const res = await instance.get('jenis_keluhan/fetchAllJenisKeluhan');
      return res.data;
    } catch (err) {
      return err;
    }
  },
  deleteJenisKeluhan: async id => {
    try {
      const res = await instance.delete(
        `jenis_keluhan/deleteJenisKeluhan/${id}`,
      );
      return res.data;
    } catch (err) {
      return err;
    }
  },
  putJenisKeluhan: async (payload, id) => {
    try {
      const res = await instance.put(
        `jenis_keluhan/putJenisKeluhan/${id}`,
        payload,
      );
      return res.data;
    } catch (err) {
      return err;
    }
  },
  createJenisKeluhan: async payload => {
    try {
      const res = await instance.post(
        'jenis_keluhan/createJenisKeluhan',
        payload,
      );
      return res.data;
    } catch (err) {
      return err;
    }
  },

  // OBAT DM
  deleteObatDm: async id => {
    try {
      const res = await instance.delete(`obat_dm/deleteObatDm/${id}`);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  putObatDm: async (payload, id) => {
    try {
      const res = await instance.put(`obat_dm/putObatDm/${id}`, payload);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  createObatDm: async payload => {
    try {
      const res = await instance.post('obat_dm/createObatDm', payload);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  fetchAllObatDm: async nim => {
    try {
      const res = await instance.get('obat_dm/fetchAllObatDm');
      return res.data;
    } catch (err) {
      return err;
    }
  },

  // USER
  loginUser: async payload => {
    try {
      const res = await instance.post('user/loginUser', payload);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  forgetPassword: async payload => {
    try {
      const res = await instance.post('user/forgetPassword', payload);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  regisUser: async payload => {
    try {
      const res = await instance.post('user/regisUser', payload);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  postDetailUser: async payload => {
    try {
      const res = await instance.post('user/postDetailUser', payload);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  fetchDetailUserById: async id => {
    try {
      const res = await instance.get(`user/fetchDetailUserById?id=${id}`);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  fetchMenuDietById: async id => {
    try {
      const res = await instance.get(`menu_diet/fetchMenuDietById/${id}`);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  fetchAllObatDm: async nim => {
    try {
      const res = await instance.get('obat_dm/fetchAllObatDm');
      return res.data;
    } catch (err) {
      return err;
    }
  },
  fetchAllJenisKeluhan: async nim => {
    try {
      const res = await instance.get('jenis_keluhan/fetchAllJenisKeluhan');
      return res.data;
    } catch (err) {
      return err;
    }
  },
  fetchRekomendasiObatByObatAndKeluhan: async (id_obat_dm, id_keluhan) => {
    try {
      const res = await instance.get(
        'rekomendasi_obat/fetchRekomendasiObatByObatAndKeluhan',
        {
          params: {
            id_obat_dm,
            id_keluhan,
          },
        },
      );
      return res.data;
    } catch (err) {
      return err;
    }
  },

  // REMINDER OBAT
  deleteReminderObat: async id => {
    try {
      const res = await instance.delete(
        `reminder_obat/deleteReminderObat/${id}`,
      );
      return res.data;
    } catch (err) {
      return err;
    }
  },
  putReminderObat: async (payload, id) => {
    try {
      const res = await instance.put(
        `reminder_obat/putReminderObat/${id}`,
        payload,
      );
      return res.data;
    } catch (err) {
      return err;
    }
  },
  createReminderObat: async payload => {
    try {
      const res = await instance.post(
        'reminder_obat/createReminderObat',
        payload,
      );
      return res.data;
    } catch (err) {
      return err;
    }
  },
  putReminderObat: async (payload, id) => {
    try {
      const res = await instance.put(
        `reminder_obat/putReminderObat/${id}`,
        payload,
      );
      return res.data;
    } catch (err) {
      return err;
    }
  },
  fetchAllReminderObat: async id_user => {
    try {
      const res = await instance.get(
        `reminder_obat/fetchAllReminderObat/${id_user}`,
      );
      return res.data;
    } catch (err) {
      return err;
    }
  },

  fetchReminderObatById: async id => {
    try {
      const res = await instance.get(
        `reminder_obat/fetchReminderObatById/${id}`,
      );
      return res.data;
    } catch (err) {
      return err;
    }
  },

  fetchAllKuesioner: async id_user => {
    try {
      const res = await instance.get(`kuesioner/fetchAllKuesioner`);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  createJawabanKuesioner: async (payload, id) => {
    try {
      const res = await instance.post(
        `kuesioner/createJawabanKuesioner/${id}`,
        payload,
      );
      return res.data;
    } catch (err) {
      return err;
    }
  },

  fetchAllfaq: async id_user => {
    try {
      const res = await instance.get(`faq/fetchAllFaq`);
      return res.data;
    } catch (err) {
      return err;
    }
  },
  fetchAllNews: async id_user => {
    try {
      const res = await instance.get(`news/fetchAllNews`);
      return res.data;
    } catch (err) {
      return err;
    }
  },
};

export default api;
