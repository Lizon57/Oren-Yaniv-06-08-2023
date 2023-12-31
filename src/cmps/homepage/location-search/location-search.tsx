import classNames from "classnames"
import { useDebouncedCallback } from "use-debounce"
import AsyncSelect from 'react-select/async'
import { useState } from "react"
import { GroupBase, OptionsOrGroups, SingleValue, StylesConfig } from 'react-select'
import { setSelectedLocation } from "@/store/actions/weather.action"
import { aweatherService } from "@/services/aweather.service"
import { stripStringToEnglishLetter } from "@/services/util/strip-string-to-english-letter"
import { AutocompleteResponse } from "@/models/aweather-resopnses/autocomplete-response"
import { LocationSearchOption } from "@/models/location/location-search-option"
import { Location } from "@/models/location/location"
import { Icon } from "@/cmps/common/icon/icon"
import { LocationSearchPreview } from "./location-search-preview"
import './styles.scss'


export function LocationSearch() {
    const [isValid, setIsValid] = useState(true)
    const debouncedLoadOptions = useDebouncedCallback(loadOptions, 300)


    const getOptions = async (pharse: string) => {
        if (!pharse) return []

        try {
            const response = await aweatherService.getAutocompleteOptions(pharse) as AutocompleteResponse
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
            const stripPharse = stripStringToEnglishLetter(pharse)
            const options = await getOptions(stripPharse)
            if (options) callback(options)
        })
    }

    const onSelcetOption = (option: SingleValue<LocationSearchOption>) => {
        if (!option) {
            setSelectedLocation()
            return
        }

        const Location: Location = {
            id: option.value,
            name: option.label,
            country: {
                code: option.country.code,
                name: option.country.name
            }
        }
        setSelectedLocation(Location)
    }

    const validateInput = (value: string) => {
        if (!value && !isValid) {
            setIsValid(true)
            return
        } else if (!value) return

        const englishRegex = /^[A-Za-z]+$/
        const isEnglishLettersOnly = englishRegex.test(value)
        if (!isEnglishLettersOnly && isValid) setIsValid(false)
    }


    return (
        <section className="homepage--location-search__container" title="Search a location">
            <AsyncSelect
                className={classNames({ 'unvalid-input': !isValid })}
                loadOptions={debouncedLoadOptions}
                styles={customStyles}
                formatOptionLabel={option => <LocationSearchPreview option={option as LocationSearchOption} />}
                placeholder={<Placeholder />}
                noOptionsMessage={({ inputValue }) => inputValue.length
                    ? `Sorry, we couldn't find any city name starts with "${inputValue}"`
                    : 'Typehead input'}
                loadingMessage={({ inputValue }) => <div>Searching for a city name starting with "{inputValue}"</div>}
                onChange={value => onSelcetOption(value as SingleValue<LocationSearchOption>)}
                onInputChange={value => validateInput(value)}
                isClearable
                cacheOptions
            />
        </section>
    )
}


function Placeholder() {
    return (
        <div className="homepage--location-search__placeholder">
            <Icon name="location" size="22px" />
            <span className="text">Search for a city</span>
        </div>
    )
}


const customStyles: StylesConfig = {
    indicatorSeparator: () => ({
        display: 'none'
    }),
    option: (provided, { isFocused }) => ({
        ...provided,
        cursor: 'pointer',
        backgroundColor: isFocused ? '#121f3f' : 'transparent',
        color: isFocused ? '#fafafa' : '#222',
    }),
    noOptionsMessage: (provided) => ({
        ...provided,
        fontSize: '0.8rem',
        padding: '2px'
    }),
    control: (base) => ({
        ...base,
        boxShadow: 'none',
        border: '1px solid #9ea1a4',
        '&:hover': {
            borderColor: '#9ea1a4',
        }
    })
}