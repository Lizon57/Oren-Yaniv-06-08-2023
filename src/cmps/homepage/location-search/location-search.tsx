import { useDebouncedCallback } from "use-debounce"
import AsyncSelect from 'react-select/async'
import { GroupBase, OptionsOrGroups, SingleValue } from 'react-select'

import { aweatherService } from "@/services/aweather.service"
import { AweatherAutocompleteResponse } from "@/models/aweather-autocomplete-response"

import { setSelectedCity } from "@/store/actions/weather.action"

import { LocationSearchOption } from "@/models/location-search-option"
import { SelectedCity } from "@/models/selected-city"

import { Icon } from "@/cmps/common/icon/icon"
import { LocationPreview } from "./location-preview"
import './styles.scss'


export function LocationSearch() {
    const debouncedLoadOptions = useDebouncedCallback(loadOptions, 300)


    const getOptions = async (pharse: string) => {
        if (!pharse) return []

        try {
            const response = await aweatherService.getAutocompleteOptions(pharse) as AweatherAutocompleteResponse
            const options = response.map(option => ({
                label: option.LocalizedName,
                value: option.Key,
                country: {
                    code: option.Country.ID.toLowerCase(),
                    name: option.Country.LocalizedName
                }
            }))
            return options as LocationSearchOption[]
        } catch (err) {
            return [] as LocationSearchOption[]
        }
    }

    function loadOptions(
        pharse: string,
        callback: (options: OptionsOrGroups<LocationSearchOption, GroupBase<LocationSearchOption>>) => void
    ) {
        return new Promise<LocationSearchOption[]>(async () => {
            const options = await getOptions(pharse)
            if (options) callback(options)
        })
    }

    const onSelcetOption = (option: SingleValue<LocationSearchOption>) => {
        if (!option) {
            setSelectedCity()
            return
        }
        console.log(option)

        const city: SelectedCity = {
            id: option.value,
            name: option.label,
            country: {
                code: option.country.code,
                name: option.country.name
            }
        }
        setSelectedCity(city)
    }


    return (
        <div className="homepage--location-search__container" title="Search a location">
            <AsyncSelect
                loadOptions={debouncedLoadOptions}
                styles={customStyles}
                formatOptionLabel={option => <LocationPreview option={option} />}
                placeholder={<Placeholder />}
                noOptionsMessage={({ inputValue }) => inputValue.length
                    ? `Sorry, we couldn't find any city name starts with "${inputValue}"`
                    : 'Type to active autocomplete'}
                loadingMessage={({ inputValue }) => <div>Searching for a city name starting with "{inputValue}"</div>}
                isClearable
                cacheOptions
                onChange={value => onSelcetOption(value)}
            />
        </div>
    )
}


function Placeholder() {
    return (
        <div className="homepage--location-search__placeholder">
            <Icon name="location" size="32" />
            <span className="text">Search for a city</span>
        </div>
    )
}


const customStyles = {
    indicatorSeparator: () => ({
        display: 'none'
    }),
    option: (provided: any, { isFocused }: any) => ({
        ...provided,
        backgroundColor: isFocused ? '#121f3f' : 'transparent',
        color: isFocused ? '#fafafa' : '#222',
    }),
    noOptionsMessage: (provided: any) => ({
        ...provided,
        fontSize: '0.8rem',
        padding: '2px'
    }),
}