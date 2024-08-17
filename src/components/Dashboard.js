import shoe from './assets/Shoes.png';
import Logo from './assets/Logo.png';
import Menu from './assets/menu.png';
import Bag from './assets/bag.png';
import MaskAroup from './assets/MaskAroup.png';
import CircleSelector from './assets/CircleSelector.png';
import GroupSlide from './assets/GroupSlide.png';
import Slide1 from './assets/Slide1.png';
import Slide2 from './assets/Slide2.png';
import Slide3 from './assets/Slide3.png';
import React from 'react';

const ProductPage = () => {
    return (
        <div className="bg-custom-gray text-white min-h-screen relative shadow-lg overflow-hidden">
            {/* Background Text */}
            <div className="absolute inset-0 flex justify-center items-center z-0 opacity-10">
                <h1 className="text-[10rem] md:text-[18rem] lg:text-[24rem] font-bold uppercase text-white">NIKE</h1>
            </div>

            {/* Navbar */}
            <header className="relative z-10 flex flex-col sm:flex-row justify-between items-center p-4 sm:p-8 mx-5">
                {/* Logo */}
                <img
                    src={Logo}
                    alt="Nike Impact 4"
                    className="h-6 sm:h-8 object-contain"
                />

                <div className="flex flex-col sm:flex-row items-center mt-4 sm:mt-0 space-y-4 sm:space-y-0 sm:space-x-6">
                    {/* Navbar */}
                    <nav className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                        <a href="#" className="hover:text-pink-500">Home</a>
                        <a href="#" className="hover:text-pink-500">Offers</a>
                        <a href="#" className="hover:text-pink-500">Collections</a>
                        <a href="#" className="hover:text-pink-500">Contact</a>
                    </nav>

                    {/* Search Input and Icons */}
                    <div className="flex items-center mt-4 sm:mt-0 space-x-4 sm:space-x-6">
                        <input className="bg-gray-700 text-sm p-2 rounded-md" type="text" placeholder="Search" />
                        <img
                            src={Bag}
                            alt="Shopping Cart"
                            className="h-6 sm:h-8 object-contain"
                        />
                        <img
                            src={Menu}
                            alt="Menu"
                            className="h-6 sm:h-8 object-contain"
                        />
                    </div>
                </div>
            </header>

            {/* Main Section */}
            <section className="relative z-10 flex flex-col lg:flex-row items-center p-4 sm:p-6 lg:p-12 lg:space-x-12">
                {/* Right Section - Product Details */}
                <div className="text-left space-y-4 lg:space-y-6 mt-4 lg:mt-0 w-full lg:w-1/2">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Nike Impact <span className="text-pink-500">4</span></h1>
                    <p className="text-xl md:text-2xl font-semibold">$250.90</p>

                    {/* Colors */}
                    <div>
                        <p className="text-lg font-semibold mb-2">Colors</p>
                        <div className="flex space-x-2">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-pink-500 rounded-full cursor-pointer"></div>
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-black rounded-full cursor-pointer"></div>
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full cursor-pointer"></div>
                        </div>
                    </div>

                    {/* Sizes */}
                    <div>
                        <p className="text-lg font-semibold mb-2">Size</p>
                        <div className="flex flex-wrap space-x-2">
                            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white text-white hover:bg-pink-500">6</button>
                            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white text-white hover:bg-pink-500">7</button>
                            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white text-white hover:bg-pink-500">8</button>
                            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white text-white hover:bg-pink-500">9</button>
                        </div>
                    </div>

                    {/* Buy Button */}
                    <div>
                        <button className="px-8 py-2 md:px-12 md:py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
                            Buy
                        </button>
                    </div>
                </div>

                {/* Center Image */}
                <div className="">
                    <img
                        src={shoe}
                        alt="Nike Impact 4"
                        className=" object-contain"
                        style={{ position: 'absolute', top: '-275px', left: '-129px' }}
                    />
                </div>
                <div className="">
                    <img
                        src={GroupSlide}
                        alt="Nike Impact 4"
                        className=" object-contain"
                        style={{ position: 'absolute', top: '175px', left: '649px' }}
                    />
                </div>

                <img
                    src={Slide1}
                    alt="Nike Impact 4"
                    className="absolute  w-1/3 h-auto object-contain"
                    style={{ zIndex: 1, top: '100px', left: '800px', height: '200px' }}
                />

                <img
                    src={Slide2}
                    alt="Nike Impact 4"
                    className="absolute  w-1/3 h-auto object-contain"
                    style={{ zIndex: 1, top: '270px', left: '630px', height: '200px' }}
                />
                <img
                    src={Slide3}
                    alt="Nike Impact 4"
                    className="absolute  w-1/3 h-auto object-contain"
                    style={{ zIndex: 1, top: '430px', left: '460px', height: '200px' }}
                />
                {/* Right Section - Product Images */}
                <div className="relative  flex flex-col items-center lg:items-end lg:flex-row lg:space-x-6 mt-8 lg:mt-0" style={{ margin: '0 0 0 500px' }}>
                    <div className="flex justify-center lg:justify-end mb-4 lg:mb-0">
                        <img
                            src={CircleSelector}
                            alt="CircleSelector"
                            className="w-full h-auto object-contain lg:max-w-lg"
                        // style={{ position: 'absolute',  }}
                        />
                    </div>
                </div>
            </section>
            <img
                src={MaskAroup}
                alt="Mask Aroup"
                className="absolute top-7 right-50  h-auto object-contain" // Adjust size and position as needed
                style={{ width: '1300px' }}
            />

        </div>
    );
};

export default ProductPage;
