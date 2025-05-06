import { $authHost, $host } from "../http/index";

export const createType = async (type) =>
{        
    const {data} = await $authHost.post('api/type', type)
        
    return data
}

export const fetchTypes = async () =>
{
    const {data} = await $host.get('api/type')
            
    return data
}

export const createBrand = async (brand) =>
{        
    const {data} = await $authHost.post('api/brand', brand)
                
    return data
}
        
export const fetchBrands = async () =>
{                    
    const {data} = await $host.get('api/brand')
                    
    return data
}
                
export const createRentedItem = async (rented_item) =>
{        
    const {data} = await $authHost.post('api/renteditems', rented_item)
                        
    return data
}
                
export const fetchRentedItems = async (typeId, brandId, page, price) => {
    const response = await $host.get('/api/renteditems', {
        params: {
            typeId,
            brandId,
            page,
            price,
        },
    });
    return response.data;
};
                      
export const fetchOneRentedItems = async (id) =>
{
    const {data} = await $host.get('api/renteditems/'+ id)
                            
    return data
}
export const updateType = async (id, typeData) => {
    const { data } = await $authHost.put(`api/type/${id}`, typeData);
    return data;
};
export const updateBrand = async (id, brandData) => {
    const { data } = await $authHost.put(`api/brand/${id}`, brandData);
    return data;
};
                        
export const deleteType = async(id)=>{
    try {
        const response = await $authHost.delete(`api/type/${id}`);
        return response.data;
    }
    catch (error) 
    {
        console.error('Error deleting type:', error.response?.data || error.message);
        throw error; 
    }
}
export const deleteBrand = async(id)=>{
    try {
        const response = await $authHost.delete(`api/brand/${id}`);
        return response.data;
    }
    catch (error) 
    {
        console.error('Error deleting brand:', error.response?.data || error.message);
        throw error;
    }
}
export const deleteRentedItem = async(id)=>{
    try {
        const response = await $host.delete(`api/renteditems/${id}`);
        return response.data;
    } catch (error)
    {
        console.error('Error deleting rented item:', error.response?.data || error.message);
        throw error;
    }
}

export const addToOrdersRent = async(rented_itemId, userId)=>{
    const { data } = await $authHost.post('api/ordersrent/add', { rented_itemId, userId });
    return data
}

export const getOrdersRent = async (userId) => {
    try {
        const { data } = await $authHost.get(`api/ordersrent/${userId}`);
        return data;  
    }
    catch (error)
    {
        throw error; 
    }
};
export const removeFromOrdersRent = async (ordersId, rented_itemId) => {
    try {
        const { data } = await $authHost.post('api/ordersrent/remove', {ordersId, rented_itemId });
        return data;
    } catch (error)
    {
        console.error("Ошибка при удалении аренды оборудования:", error);
        throw error;
    }
};
export const fetchOrdersRentId = async (userId) => {
    try {
        const { data } = await $authHost.get(`api/ordersrent/${userId}`);
        return data.ordersId;  
    } catch (error) 
    {
        console.error("Ошибка получения корзины:", error);
        throw error;
    }
};