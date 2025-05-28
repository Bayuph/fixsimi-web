import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const [files, setFiles] = useState([]);
  const [phone, setPhone] = useState('');
  const [filters, setFilters] = useState({ kutipan: false, daftarPustaka: false, sumberRendah: false });

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const handlePayment = () => {
    const snapUrl = "https://app.sandbox.midtrans.com/snap/v2/vtweb/your_transaction_token"; // Ganti dengan Snap URL
    window.open(snapUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white p-6 text-gray-800">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">Fixsimi.id</h1>
        <p className="text-lg text-gray-500">Cek Turnitin Aman - No Repository - 24 Jam</p>
        <p className="text-sm">Pendamping Penulisan Anda</p>
      </header>

      <div className="max-w-3xl mx-auto bg-gray-50 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Cek Plagiasi No-Repository</h2>

        <div {...getRootProps({ className: 'border-2 border-dashed border-gray-300 p-8 text-center rounded-md cursor-pointer bg-white mb-4' })}>
          <input {...getInputProps()} />
          <p className="text-gray-600">Tarik file ke sini atau klik untuk unggah (.docx / .pdf)</p>
        </div>

        <div className="mb-4">
          <h3 className="font-medium">1. Pilih filter yang diinginkan</h3>
          <div className="space-y-2 mt-2">
            <label className="flex items-center">
              <input type="checkbox" name="kutipan" checked={filters.kutipan} onChange={handleCheckboxChange} className="mr-2" />
              Kecualikan Kutipan
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="daftarPustaka" checked={filters.daftarPustaka} onChange={handleCheckboxChange} className="mr-2" />
              Kecualikan Daftar Pustaka
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="sumberRendah" checked={filters.sumberRendah} onChange={handleCheckboxChange} className="mr-2" />
              Kecualikan sumber &lt;1%
            </label>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-medium">2. Nomor WhatsApp untuk kirim hasil</h3>
          <Input type="text" placeholder="62xxxxxxxxxx" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="text-right">
          <Button onClick={handlePayment} disabled={!files.length || !phone}>
            Bayar & Proses
          </Button>
        </div>
      </div>

      <footer className="mt-12 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Fixsimi.id — Your Writing Assistant
      </footer>
    </div>
  );
}
