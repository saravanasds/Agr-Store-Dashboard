import React, { useState } from 'react';
import axios from 'axios';
import { VscAccount } from 'react-icons/vsc';
import ClipLoader from 'react-spinners/ClipLoader';

const Settings = () => {
  const [offerImage, setOfferImage] = useState(null);
  const [heroImages, setHeroImages] = useState([]);
  const [offerHeading, setOfferHeading] = useState('');
  const [heroHeading, setHeroHeading] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [settingId, setSettingId] = useState('66ed192bd46b4ee87dc4a456');

  const handleOfferImageChange = (e) => {
    const file = e.target.files[0];
    setOfferImage(file);
  };

  const handleHeroImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setHeroImages(files);
  };

  const handleCreateSetting = async (e) => {
    e.preventDefault();
    setCreateLoading(true);

    const formData = new FormData();
    formData.append('offerImage', offerImage);
    formData.append('offerHeading', offerHeading);
    formData.append('heroHeading', heroHeading);

    for (let i = 0; i < heroImages.length; i++) {
      formData.append('heroImages', heroImages[i]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/admin/settings', formData);
      alert('Setting Created Successfully');
    } catch (error) {
      console.error('Error creating setting:', error);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdateSetting = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    const formData = new FormData();
    formData.append('offerImage', offerImage);
    formData.append('offerHeading', offerHeading);
    formData.append('heroHeading', heroHeading);

    for (let i = 0; i < heroImages.length; i++) {
      formData.append('heroImages', heroImages[i]);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/admin/settings/${settingId}`, formData);
      alert('Setting Updated Successfully');
    } catch (error) {
      console.error('Error updating setting:', error);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className='w-full min-h-screen'>
      <div className='w-full h-16 bg-[rgba(0,0,0,0.4)] flex justify-between items-center py-3 px-10 shadow-md shadow-gray-600 z-10 border-b border-cyan-400'>
        <div>
          <span className='sm:text-2xl font-bold uppercase text-gray-300 tracking-widest'>Settings</span>
        </div>
        <div className='rounded-full flex justify-center items-center'>
          <VscAccount className='text-gray-400 w-8 h-8' />
        </div>
      </div>

      <div className='flex flex-col md:flex-row border justify-center items-center gap-4 md:gap-10 '>
        {/* Create Settings Form */}
        <form onSubmit={handleCreateSetting} className='hidden'>
          <div className='w-full flex flex-col justify-center items-center'>
            <label htmlFor='offerImage' className='mb-4 text-white'>Offer Image:</label>
            <input
              type='file'
              onChange={handleOfferImageChange}
              accept='image/*'
              className='w-[250px] xs:w-[300px] mb-4 bg-white text-sm sm:text-[16px]'
            />

            <label htmlFor='offerHeading' className='mb-4 text-white'>Offer Heading:</label>
            <input
              type='text'
              value={offerHeading}
              onChange={(e) => setOfferHeading(e.target.value)}
              className='w-[250px] xs:w-[300px] mb-4 bg-white text-sm sm:text-[16px]'
              placeholder='Enter Offer Heading'
            />

            <label htmlFor='heroImages' className='mb-4 text-white'>Hero Images (select multiple):</label>
            <input
              type='file'
              onChange={handleHeroImagesChange}
              accept='image/*'
              multiple
              className='w-[250px] xs:w-[300px] mb-4 bg-white text-sm sm:text-[16px]'
            />

            <label htmlFor='heroHeading' className='mb-4 text-white'>Hero Heading:</label>
            <input
              type='text'
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              className='w-[250px] xs:w-[300px] mb-4 bg-white text-sm sm:text-[16px]'
              placeholder='Enter Hero Heading'
            />

            <button type='submit' className='bg-cyan-600 py-2 px-6 text-white font-semibold text-sm sm:text-lg'>
              {createLoading ? <ClipLoader color='#ffffff' size={20} /> : 'Create'}
            </button>
          </div>
        </form>

        {/* Update Settings Form */}
        <form onSubmit={handleUpdateSetting} className='mt-8'>
          <div className='w-full flex flex-col justify-center items-center'>
            <label htmlFor='newOfferImage' className='mb-4 text-white'>New Offer Image:</label>
            <input
              type='file'
              onChange={handleOfferImageChange}
              accept='image/*'
              className='w-[250px] xs:w-[300px] md:w-[500px] mb-4 bg-white text-sm sm:text-[16px]'
            />

            <label htmlFor='newOfferHeading' className='mb-4 text-white'>New Offer Heading:</label>
            <input
              type='text'
              value={offerHeading}
              onChange={(e) => setOfferHeading(e.target.value)}
              className='w-[250px] xs:w-[300px] md:w-[500px] mb-4 bg-white text-sm sm:text-[16px]'
              placeholder='Enter New Offer Heading'
            />

            <label htmlFor='newHeroImages' className='mb-4 text-white'>New Hero Images (select multiple):</label>
            <input
              type='file'
              onChange={handleHeroImagesChange}
              accept='image/*'
              multiple
              className='w-[250px] xs:w-[300px] md:w-[500px] mb-4 bg-white text-sm sm:text-[16px]'
            />

            <label htmlFor='newHeroHeading' className='mb-4 text-white'>New Hero Heading:</label>
            <input
              type='text'
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              className='w-[250px] xs:w-[300px] md:w-[500px] mb-4 bg-white text-sm sm:text-[16px]'
              placeholder='Enter New Hero Heading'
            />

            <button type='submit' className='bg-cyan-600 py-2 px-6 text-white font-semibold text-sm sm:text-lg'>
              {updateLoading ? <ClipLoader color='#ffffff' size={20} /> : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
