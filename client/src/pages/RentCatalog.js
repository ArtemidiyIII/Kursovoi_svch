import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import RentItemsList from '../components/RentItemsList';
import Button from 'react-bootstrap/Button'
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { useLocation, useNavigate } from 'react-router-dom';
import RentPageNumber from '../components/RentPageNumber'
import { fetchTypes, fetchBrands, fetchRentedItems } from '../http/rentItemAPI';


const RentCatalog = observer(() => {
    const { rented_items } = useContext(Context);
    const location = useLocation(); 
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const typeFilter = queryParams.get('type'); 
        const brandFilter = queryParams.get('brand');
        if (queryParams.has('type') || queryParams.has('brand')) {
            navigate('/rentcatalog');
        }
        
        if (typeFilter) {
            const selectedType = rented_items.types.find(type => type.name === typeFilter);
            if (selectedType) {
                rented_items.setSelectedType(selectedType);
                localStorage.setItem('selectedType', JSON.stringify(selectedType)); 
            }
        } 
        else {          
            const savedType = JSON.parse(localStorage.getItem('selectedType'));
            if (savedType) {
                rented_items.setSelectedType(savedType);
            }
        }
    
      
        if (brandFilter) {
            const selectedBrand = rented_items.brands.find(brand => brand.name === brandFilter);
            if (selectedBrand) {
                rented_items.setSelectedBrand(selectedBrand);
                localStorage.setItem('selectedBrand', JSON.stringify(selectedBrand));
            }
        } 
        else {
            const savedBrand = JSON.parse(localStorage.getItem('selectedBrand'));
            if (savedBrand) {
                rented_items.setSelectedBrand(savedBrand);
            }
        }
    
        const loadInitialData = async () => {
            try {
                const types = await fetchTypes();
                rented_items.setTypes(types);
    
                const brands = await fetchBrands();
                rented_items.setBrands(brands);
    
                const fetchedRentedItems = await fetchRentedItems(
                    rented_items.selectedType.id || null,
                    rented_items.selectedBrand.id || null,
                    1,
                    rented_items.limitRentItems
                );
                rented_items.setRentedItems(fetchedRentedItems.rows);
                rented_items.setTotalCountRentItems(fetchedRentedItems.count);
            } 
            catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };
    
        loadInitialData();
    }, [rented_items, location.search]);
    
    useEffect(() => {
        
        const loadFilteredRentedItems = async () => {
            try {
                const fetchedRentedItems = await fetchRentedItems(
                    rented_items.selectedType.id || null,
                    rented_items.selectedBrand.id || null,
                    rented_items.page,
                    rented_items.limitRentItems
                );
                rented_items.setRentedItems(fetchedRentedItems.rows);
                rented_items.setTotalCountRentItems(fetchedRentedItems.count);
            } 
            catch (error) {
                console.error("Ошибка при загрузке дополнительного оборудования в прокат:", error);
            }
        };
    
        loadFilteredRentedItems();
    }, [rented_items, rented_items.selectedType, rented_items.selectedBrand, rented_items.page, rented_items.limitRentItems]);
      
    const resetFilters = () => {
        rented_items.setSelectedType({});
        rented_items.setSelectedBrand({});
        rented_items.setPage(1);
    
        localStorage.removeItem('selectedType');
        localStorage.removeItem('selectedBrand');
       
    };

    return (
        <Container>
            <Row className="mt-2">
                <Col md = {3}>
                    <TypeBar/>
                </Col>
                <Col md = {9}>
                    <BrandBar/>
                    <Button variant="outline-danger" onClick={resetFilters} className="mt-3">
                        Сбросить фильтры
                    </Button>
                    <RentItemsList/>
                    <RentPageNumber/>
                </Col>
            </Row>
        </Container>
    )
})

export default RentCatalog;